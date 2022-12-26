import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, query, where } from 'firebase/firestore';
import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import MyLoadingFull from '~/base/components/MyLoadingFull';
import ItemCourse from '~/components/Course/ItemCourse';
import { db } from '~/firebase/config';
import useUser from '~/hooks/useUser';
import { useRefreshByUser } from '~/utils/hooks';

function ListCourseBookmark() {
  const { user } = useUser();
  const docRef = collection(db, 'mycourse');
  const q = query(
    docRef,
    where('isBookmark', '==', true),
    where('userId', '==', user?.userId || ''),
  );
  const {
    data: myCourseBookmark,
    isLoading,
    refetch,
  } = useFirestoreQuery(['mycourse-bookmark'], q, { subscribe: true });
  if (isLoading) {
    return <MyLoadingFull text={'Đang tải dữ liệu'} />;
  } else {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {myCourseBookmark?.docs?.map((item, i) => {
          if (item?.data().isBookmark) {
            return <ItemCourse key={i} courseId={item?.data()?.courseId} />;
          } else {
            return null;
          }
        })}
      </ScrollView>
    );
  }
}

export default ListCourseBookmark;
