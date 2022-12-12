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
import {
  useFirestoreDocument,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import { formatNumber } from '~/utils';
import MyToast from '~/base/components/MyToast';

function DetailCourse({ navigation, route }) {
  const { data } = route.params;
  const [countLesson, setCountLesson] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const { theme } = useTheme();

  const { user, setUser } = useUser();
  const modalRef = useRef();
  const notEnoughMoneyRef = useRef();
  const enrollCourseRef = useRef();
  const lessonsRef = collection(db, 'lessons');
  const toastRef = useRef();
  // getTotalTime();
  useEffect(() => {
    const getCountLesson = async () => {
      const snapshot = await getCountFromServer(lessonsRef);
      setCountLesson(snapshot.data().count);
    };
    getCountLesson();
  }, [lessonsRef]);
  useEffect(() => {
    const getTotalTime = async () => {
      const q = query(lessonsRef, where('courseId', '==', data.courseID));
      const snapshot = await getDocs(q);
      let times = 0;
      snapshot.forEach(d => (times += d.data().time));
      setTotalTime(times);
      return times;
    };
    getTotalTime();
  }, [data.courseID, lessonsRef]);
  const docRef = doc(
    db,
    'mycourse',
    user?.userId?.toString() + data.courseID.toString(),
  );
  const { data: myCourse, refetch } = useFirestoreDocument(
    ['mycourse', user?.userId?.toString() + data.courseID.toString()],
    docRef,
  );
  const mutationCourse = useFirestoreDocumentMutation(
    docRef,
    { merge: true },
    { onSettled: refetch },
  );
  const handleBookmark = async () => {
    const docsnap = await getDoc(docRef);
    if (docsnap.exists()) {
      if (docsnap.data().isBookmark) {
        modalRef?.current?.open();
      } else {
        mutationCourse.mutate({ isBookmark: true });
      }
    } else {
      const params = {
        userId: user.userId,
        courseId: data.courseID,
        isBookmark: true,
        status: 0,
      };
      mutationCourse.mutate(params);
    }
  };
  const handleCloseModal = ref => {
    ref?.current?.close();
  };
  const handleRemoveBookmark = () => {
    mutationCourse.mutate({ isBookmark: false });
    modalRef?.current?.close();
  };
  const handleCheckCoins = () => {
    const coins = user?.coins;
    if (coins >= data?.price) {
      enrollCourseRef?.current?.open();
    } else {
      notEnoughMoneyRef?.current?.open();
    }
  };
  const goToTransaction = () => {
    notEnoughMoneyRef?.current?.close();
    navigation.navigate('Transaction');
  };
  const setCoinsUser = () => {
    try {
      const newMycoins = user?.coins - data?.price;
      const userParam = {
        ...user,
        coins: newMycoins,
      };
      setUser(userParam);
      const userRef = doc(db, 'users', user?.username);
      setDoc(userRef, { coins: newMycoins }, { merge: true });
      toastRef?.current?.open(true, 'Bạn đã tham gia khóa học thành công!');
    } catch (e) {
      console.log('error enroll course(exist): ', e);
      toastRef?.current?.open(true, 'Tham gia khóa học thất bại!');
    }
    enrollCourseRef?.current?.close();
  };
  const handleEnrollCourse = async () => {
    const docsnap = await getDoc(docRef);
    if (docsnap.exists()) {
      mutationCourse.mutate({ status: 1 });
      setCoinsUser();
    } else {
      const params = {
        userId: user.userId,
        courseId: data.courseID,
        isBookmark: false,
        status: 1,
      };
      mutationCourse.mutate(params);
      setCoinsUser();
    }
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
              <MyToast ref={toastRef} />
              <Header
                handleBookmark={handleBookmark}
                isBookmark={myCourse?.data()?.isBookmark || false}
              />
              <View style={tw`flex-1`}>
                <MyTabBar />
              </View>
            </View>
            {myCourse?.data()?.status === 0 && (
              <ButtonEnrolCourse onPress={handleCheckCoins} />
            )}
          </View>

          <BottomModal ref={modalRef}>
            <View style={tw`pb-10 rounded-t-3xl bg-${theme.bg}`}>
              <View
                style={tw`py-5 items-center mx-5 border-b-[0.2px] border-gray`}>
                <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
                  Bỏ đánh dấu khóa học này?
                </Text>
              </View>
              <ItemCourse courseId={data?.courseID} canPress={false} />
              <View
                style={tw`flex-row items-center h-16 mt-6 overflow-hidden px-5`}>
                <MyButton
                  title={'Hủy'}
                  style={tw`flex-1 h-14 bg-blueOpacity mr-2`}
                  titleColor={tw.color('blue')}
                  onPress={() => handleCloseModal(modalRef)}
                />
                <MyButton
                  title={'Bỏ đánh dấu'}
                  style={tw`flex-1 h-14 bg-blue ml-2`}
                  titleColor={tw.color('white')}
                  onPress={handleRemoveBookmark}
                />
              </View>
            </View>
          </BottomModal>
          <BottomModal ref={notEnoughMoneyRef}>
            <View style={tw`pb-10 rounded-t-3xl bg-${theme.bg}`}>
              <View
                style={tw`py-5 items-center mx-5 border-b-[0.2px] border-gray`}>
                <View>
                  <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
                    Bạn không đủ tiền để mua khóa học này!
                  </Text>
                </View>
                <View style={tw`flex-row items-center justify-center w-[96%]`}>
                  <Text style={tw`font-qs-regular text-sm text-${theme.text}`}>
                    Số tiền hiện tại: {formatNumber(user?.coins)} đ
                  </Text>
                  {/* <Text style={tw`font-qs-regular text-xs text-${theme.text}`}>
                    Course price: {formatNumber(data?.price)} đ
                  </Text> */}
                </View>
              </View>
              <ItemCourse courseId={data?.courseID} canPress={false} />
              <View
                style={tw`flex-row items-center h-16 mt-6 overflow-hidden px-5`}>
                <MyButton
                  title={'Hủy'}
                  style={tw`flex-1 h-14 bg-blueOpacity mr-2`}
                  titleColor={tw.color('blue')}
                  onPress={() => handleCloseModal(notEnoughMoneyRef)}
                />
                <MyButton
                  title={'Tới nạp tiền'}
                  style={tw`flex-1 h-14 bg-blue ml-2`}
                  titleColor={tw.color('white')}
                  onPress={goToTransaction}
                />
              </View>
            </View>
          </BottomModal>
          <BottomModal ref={enrollCourseRef}>
            <View style={tw`pb-10 rounded-t-3xl bg-${theme.bg}`}>
              <View
                style={tw`py-5 items-center mx-5 border-b-[0.2px] border-gray`}>
                <View>
                  <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
                    Bạn chắc chắn muốn mua khóa học này?
                  </Text>
                </View>
                <View style={tw`flex-row items-center justify-center w-[96%]`}>
                  <Text style={tw`font-qs-regular text-sm text-${theme.text}`}>
                    Số tiền hiện tại: {formatNumber(user?.coins)} đ
                  </Text>
                  {/* <Text style={tw`font-qs-regular text-xs text-${theme.text}`}>
                    Course price: {formatNumber(data?.price)} đ
                  </Text> */}
                </View>
              </View>
              <ItemCourse courseId={data?.courseID} canPress={false} />
              <View
                style={tw`flex-row items-center h-16 mt-6 overflow-hidden px-5`}>
                <MyButton
                  title={'Hủy'}
                  style={tw`flex-1 h-14 bg-blueOpacity mr-2`}
                  titleColor={tw.color('blue')}
                  onPress={() => handleCloseModal(notEnoughMoneyRef)}
                />
                <MyButton
                  title={'Đồng ý'}
                  style={tw`flex-1 h-14 bg-blue ml-2`}
                  titleColor={tw.color('white')}
                  onPress={handleEnrollCourse}
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
