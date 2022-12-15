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
import tw from '~/libs/tailwind';
import { convertMintoHrs } from '~/utils';

function Courses({ userId, courseId }) {
  const { theme } = useTheme();
  const [totalTime, setTotalTime] = useState(0);
  const [countLesson, setCountLesson] = useState(0);
  const navigation = useNavigation();
  const collectionRef = collection(db, 'mycourse');
  const ref = doc(collectionRef, userId?.toString() + courseId?.toString());
  const { data, isLoading } = useFirestoreDocument(
    ['mycourse', userId?.toString() + courseId?.toString()],
    ref,
    { subscribe: true },
  );
  const courseRef = doc(collection(db, 'courses'), courseId?.toString());
  const { data: course, isLoading: isLoadingCourse } = useFirestoreDocument(
    ['course', courseId],
    courseRef,
  );
  const lessonsRef = query(
    collection(db, 'lessons'),
    where('courseId', '==', courseId || ''),
  );
  useEffect(() => {
    const getTotalTime = async () => {
      const q = query(lessonsRef, where('courseId', '==', courseId));
      const snapshot = await getDocs(q);
      let times = 0;
      snapshot.forEach(d => (times += d.data().time));
      setTotalTime(times);
    };
    const getCountLesson = async () => {
      const snapshot = await getCountFromServer(lessonsRef);
      setCountLesson(snapshot.data().count);
    };
    getCountLesson();
    getTotalTime();
  }, [courseId, lessonsRef]);
  // console.log(1);
  // const percent = (
  //   ((item.progress || 0) / (item.totalLesson || 1)) *
  //   100
  // ).toFixed(0);
  // const color = () => {
  //   if (percent <= 25) {
  //     return 'green';
  //   } else if (percent <= 50) {
  //     return 'yellow';
  //   } else if (percent <= 75) {
  //     return 'orange';
  //   } else if (percent <= 99) {
  //     return 'red';
  //   } else {
  //     return 'blue';
  //   }
  // };
  const goToDetail = item => {
    navigation.navigate('DetailMyCourse', {
      data: item,
    });
  };
  // console.log(data?.data());
  if (isLoading || isLoadingCourse) {
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
              // style={[tw`h-full rounded-xl bg-${color()} w-[${percent}%]`]}
              />
            </View>
            <Text
              style={tw`w-16 ml-2 font-qs-medium text-right text-${theme.text}`}>
              {data?.data()?.progress || 0} / {countLesson || 0}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Courses;
