import React, { useMemo } from 'react';
import { useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import MyButton from '~/components/MyButton';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import BottomModal from '~/modals/BottomModal';
import ItemCourse from '../../components/Course/ItemCourse';
import MyTabBar from './layouts/Course/MyTabBar';

import Header from './layouts/Course/Header';
import ButtonEnrolCourse from '~/components/ButtonEnrollCourse';
import { CourseProvider } from '~/provider/CourseProvider';
import { useCallback } from 'react';
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '~/firebase/config';
import { useState } from 'react';
import useUser from '~/hooks/useUser';

function DetailCourse({ navigation, route }) {
  const { data, categoryName } = route.params;
  const [countLesson, setCountLesson] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  // const [isBookmark, setIsBookmark] = useState(false);
  const [myCourse, setMyCourse] = useState(null);
  const { theme } = useTheme();
  const { user } = useUser();
  // console.log(user);
  const modalRef = useRef();
  const lessonsRef = collection(db, 'lessons');
  const getCountLesson = useCallback(async () => {
    const snapshot = await getCountFromServer(lessonsRef);
    setCountLesson(snapshot.data().count);
  }, [lessonsRef]);

  const getTotalTime = useCallback(async () => {
    const q = query(lessonsRef, where('courseId', '==', data.courseID));
    const snapshot = await getDocs(q);
    let times = 0;
    snapshot.forEach(d => (times += d.data().time));
    setTotalTime(times);
    return times;
  }, [data.courseID, lessonsRef]);
  // getTotalTime();
  useEffect(() => {
    getCountLesson();
  }, [getCountLesson]);
  useEffect(() => {
    getTotalTime();
  }, [getTotalTime]);
  // console.log('1');
  const docRef = doc(
    db,
    'mycourse',
    user?.userId?.toString() + data.courseID.toString(),
  );
  const getMyCourse = useCallback(async () => {
    const docsnap = await getDoc(docRef);
    if (docsnap.exists()) {
      setMyCourse(docsnap.data());
    }
  }, [docRef]);
  // getMyCourse();
  useEffect(() => {
    getMyCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleBookmark = async () => {
    const docsnap = await getDoc(docRef);
    if (docsnap.exists()) {
      if (docsnap.data().isBookmark) {
        modalRef?.current?.open();
      } else {
        setDoc(docRef, { isBookmark: true }, { merge: true });
        const params = {
          ...myCourse,
          isBookmark: true,
        };
        setMyCourse(params);
      }
    } else {
      const params = {
        userId: user.userId,
        courseId: data.courseID,
        isBookmark: true,
        status: 0,
      };
      setDoc(docRef, params);
      setMyCourse(params);
    }
  };
  const handleCloseModal = () => {
    modalRef?.current?.close();
  };
  const handleRemoveBookmark = () => {
    setDoc(docRef, { isBookmark: false }, { merge: true });
    const params = {
      ...myCourse,
      isBookmark: false,
    };
    setMyCourse(params);
    modalRef?.current?.close();
  };
  return (
    <Container>
      <CourseProvider
        course={data}
        countLesson={countLesson}
        totalTime={totalTime}>
        <View style={tw`flex-1`}>
          <View style={tw`flex-1`}>
            <View style={[tw`flex-1`]}>
              <Header
                categoryName={categoryName}
                handleBookmark={handleBookmark}
                isBookmark={myCourse?.isBookmark || false}
              />
              <View style={tw`flex-1`}>
                <MyTabBar />
              </View>
            </View>
            <ButtonEnrolCourse />
          </View>

          <BottomModal ref={modalRef}>
            <View style={tw`pb-10 rounded-t-3xl bg-${theme.bg}`}>
              <View
                style={tw`py-5 items-center mx-5 border-b-[0.2px] border-gray`}>
                <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
                  Remove from Bookmark?
                </Text>
              </View>
              <ItemCourse item={data} canPress={false} />
              <View
                style={tw`flex-row items-center h-16 mt-6 overflow-hidden px-5`}>
                <MyButton
                  title={'Cancel'}
                  style={tw`flex-1 h-14 bg-blueSoft mr-2`}
                  titleColor={tw.color('blue')}
                  onPress={handleCloseModal}
                />
                <MyButton
                  title={'Yes, Remove'}
                  style={tw`flex-1 h-14 bg-blue ml-2`}
                  titleColor={tw.color('white')}
                  onPress={handleRemoveBookmark}
                />
              </View>
            </View>
          </BottomModal>
        </View>
      </CourseProvider>
    </Container>
  );
}

export default DetailCourse;
