import { async } from '@firebase/util';
import { useNavigation } from '@react-navigation/native';
import {
  useFirestoreDocument,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import {
  collection,
  doc,
  getCountFromServer,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';
import { convertMintoHrs } from '~/utils';

function Courses({ courseId }) {
  const { theme } = useTheme();
  const { user } = useUser();
  const navigation = useNavigation();
  const [lessonsCompleted, setLessonsCompleted] = useState(0);

  const courseRef = doc(collection(db, 'courses'), courseId?.toString());
  const { data: course, isLoading: isLoadingCourse } = useFirestoreDocument(
    ['course', courseId],
    courseRef,
  );
  const lessonsRef = query(
    collection(db, 'lessons'),
    where('courseId', '==', courseId || ''),
  );
  const { data: lessons, isLoading: isLoadingLesson } = useFirestoreQuery(
    ['lessons', courseId],
    lessonsRef,
    { subscribe: true },
  );

  useEffect(() => {
    const listLessonId = lessons?.docs?.map(d => {
      return d?.data()?.lessonId;
    });
    const getListLessonCompleted = async () => {
      const ref = query(
        collection(db, 'mylesson'),
        where('lessonId', 'in', listLessonId),
        where('userId', '==', user?.userId),
        where('status', '==', 1),
      );
      onSnapshot(ref, s => {
        setLessonsCompleted(s?.docs?.length);
      });
      // setLessonsCompleted(snapshot?.docs?.length);
    };
    if (listLessonId) {
      getListLessonCompleted();
    }
  }, [lessons?.docs, user?.userId]);
  const totalTime = lessons?.docs?.reduce((total, current) => {
    return total + current?.data()?.time;
  }, 0);

  const percent = (
    ((lessonsCompleted || 0) / (lessons?.docs?.length || 1)) *
    100
  ).toFixed(0);
  const color = () => {
    if (percent <= 25) {
      return 'green';
    } else if (percent <= 50) {
      return 'yellow';
    } else if (percent <= 75) {
      return 'orange';
    } else if (percent <= 99) {
      return 'red';
    } else {
      return 'blue';
    }
  };
  const goToDetail = item => {
    navigation.navigate('DetailMyCourse', {
      data: item,
    });
  };
  if (isLoadingCourse || isLoadingLesson) {
    return <MyLoading text={'Đang tải dữ liệu'} />;
  } else {
    return (
      <TouchableOpacity
        onPress={() => goToDetail(course?.data())}
        style={tw`flex-row items-center mx-5 p-4 mb-5 rounded-2xl bg-${theme.bgInput} shadow-2xl`}>
        <Image
          style={tw`w-20 h-20 rounded-xl`}
          source={{ uri: course?.data()?.image }}
        />
        <View style={tw`ml-4 flex-1`}>
          <Text
            numberOfLines={1}
            style={tw`font-qs-bold text-base text-${theme.text}`}>
            {course?.data()?.courseName || ''}
          </Text>
          <Text style={tw`font-qs-regular text-sm text-${theme.text} mt-1`}>
            {convertMintoHrs(totalTime) || 0}
          </Text>
          <View style={tw`flex-row items-center`}>
            <View style={tw`flex-1 h-2 rounded-xl bg-gray-border`}>
              <View
                style={[tw`h-full rounded-xl bg-${color()} w-[${percent}%]`]}
              />
            </View>
            <Text
              style={tw`w-16 ml-2 font-qs-medium text-right text-${theme.text}`}>
              {lessonsCompleted || 0} / {lessons?.docs?.length || 0}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Courses;
