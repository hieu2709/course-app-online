import { useFirestoreInfiniteQuery } from '@react-query-firebase/firestore';
import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import ItemCourse from '~/components/Course/ItemCourse';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import { useRefreshByUser } from '~/utils/hooks';

function SceneCourse({ categoryId }) {
  const courseRef = collection(db, 'courses');
  const { theme } = useTheme();
  const ref = categoryId
    ? query(
        courseRef,
        orderBy('dateCreated', 'desc'),
        where('categoryId', '==', categoryId),
        limit(4),
      )
    : query(courseRef, orderBy('dateCreated', 'desc'), limit(4));
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useFirestoreInfiniteQuery(
      ['all-course-infinite', categoryId?.toString() || 'all'],
      ref,
      snapshot => {
        const lastDocument = snapshot.docs[snapshot.docs.length - 1];
        if (!lastDocument) {
          return;
        } else {
          return query(ref, startAfter(lastDocument));
        }
      },
    );
  const list = () => {
    let paginatedData = [];
    data?.pages?.forEach(page => {
      page?.docs?.forEach(char => {
        paginatedData.push(char?.data());
      });
    });
    return paginatedData;
  };
  const renderLoader = () => {
    if (hasNextPage) {
      return <MyLoading />;
    } else {
      return null;
    }
  };
  const loadMore = () => {
    // console.log("load more", hasNextPage);
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const renderItem = item => (
    <View>
      <ItemCourse courseId={item?.item?.courseID} />
    </View>
  );
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  if (isLoading) {
    return <MyLoading text={'Đang tải...'} />;
  } else {
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
        data={list()}
        renderItem={renderItem}
        keyExtractor={(item, i) => i}
        onEndReached={loadMore}
        ListFooterComponent={renderLoader}
      />
    );
  }
}

export default SceneCourse;
