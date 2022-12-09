import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import ItemLesson from '~/components/Lessons/ItemLesson';
import useCourse from '~/hooks/useCourse';
import {
  collection,
  getCountFromServer,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '~/firebase/config';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import MyLoading from '~/base/components/MyLoading';
import { useEffect } from 'react';
import { useCallback } from 'react';

function Lessons() {
  const { theme } = useTheme();
  const { course, countLesson } = useCourse();
  const lessonsRef = collection(db, 'lessons');
  const ref = query(
    lessonsRef,
    where('courseId', '==', course.courseID),
    orderBy('lessonId'),
    limit(5),
  );
  const { data, isLoading } = useFirestoreQuery(
    ['lesson-limit', course.courseID],
    ref,
  );

  const navigation = useNavigation();
  const goToAllLessons = () => {
    navigation.navigate('AllLessons', { course });
  };
  if (isLoading) {
    return <MyLoading text={'Loading'} />;
  } else {
    return (
      <View style={tw`flex-1`}>
        <View
          style={tw`flex-row justify-between items-center mt-5 mx-5 pb-2.5`}>
          <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
            {countLesson} Lessons
          </Text>
          <TouchableOpacity onPress={goToAllLessons}>
            <Text style={tw`font-qs-bold text-base text-blue`}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={tw`flex-1`}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          <View style={tw`mx-5 pt-2.5`}>
            {data?.docs?.map((item, i) => (
              <ItemLesson key={i} item={item.data()} style={tw`mb-5`} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Lessons;
