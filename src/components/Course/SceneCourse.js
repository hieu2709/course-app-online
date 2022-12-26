import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, limit, query, where } from 'firebase/firestore';
import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import { db } from '~/firebase/config';
import tw from '~/libs/tailwind';
import { useRefreshByUser } from '~/utils/hooks';
import ItemCourse from './ItemCourse';

function SceneCourse({ categoryId }) {
  const courseRef = collection(db, 'courses');
  const ref = categoryId
    ? query(courseRef, where('categoryId', '==', categoryId), limit(4))
    : query(courseRef, limit(4));
  const { data, isLoading, refetch, isFetching } = useFirestoreQuery(
    ['course-limit-', categoryId || 'all'],
    ref,
    { subscribe: true },
  );
  // console.log(isFetching);

  if (isLoading) {
    return <MyLoading text={'Đang tải...'} />;
  } else {
    return (
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`pb-2`}
        showsVerticalScrollIndicator={false}>
        {data?.docs?.map((item, i) => (
          <ItemCourse key={i} courseId={item?.data()?.courseID} />
        ))}
      </ScrollView>
    );
  }
}

export default SceneCourse;
