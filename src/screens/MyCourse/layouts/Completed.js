import { useFirestoreInfiniteQuery } from '@react-query-firebase/firestore';
import {
  collection,
  limit,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';
import { useRefreshByUser } from '~/utils/hooks';
import Courses from '../components/Courses';

function Completed() {
  const { theme } = useTheme();
  const { user } = useUser();
  const collectionRef = collection(db, 'mycourse');
  const Query = query(
    collectionRef,
    where('userId', '==', user?.userId || ''),
    where('status', '==', 2),
    limit(5),
  );
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useFirestoreInfiniteQuery(
      ['my-course-completed-infinite', user?.userId?.toString() || ''],
      Query,
      snapshot => {
        const lastDocument = snapshot.docs[snapshot.docs.length - 1];
        if (!lastDocument) {
          return;
        } else {
          return query(Query, startAfter(lastDocument));
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
  const renderItem = item => {
    // console.log(item);
    return (
      <View
        style={tw`bg-${
          item?.index % 2 === 0 ? theme.bg : theme.bgInput
        } mx-2 my-1 py-2  justify-center rounded`}>
        <Courses courseId={item?.item?.courseId} />
      </View>
    );
  };
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  if (isLoading) {
    return <MyLoading text={'Đang tải dữ liệu'} />;
  } else {
    return (
      <View style={tw`flex-1`}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefetchingByUser}
              onRefresh={refetchByUser}
            />
          }
          data={list()}
          renderItem={renderItem}
          keyExtractor={item =>
            item?.courseId?.toString() + item?.userId?.toString()
          }
          onEndReached={loadMore}
          ListFooterComponent={renderLoader}
        />
      </View>
    );
  }
}

export default Completed;
