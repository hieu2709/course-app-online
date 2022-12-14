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
import MyLoadingFull from '~/base/components/MyLoadingFull';
import ItemLesson from '~/components/Lessons/ItemLesson';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { useRefreshByUser } from '~/utils/hooks';

function Lessons({ courseId }) {
  const { theme } = useTheme();
  const lessonsRef = collection(db, 'lessons');
  const ref = query(
    lessonsRef,
    where('courseId', '==', courseId || ''),
    orderBy('index'),
    limit(6),
  );
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useFirestoreInfiniteQuery(
      ['lessons-infinite', courseId?.toString()],
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
    <View
      style={tw`bg-${
        item?.index % 2 === 0 ? theme.bg : theme.bgInput
      } mx-5 my-1 py-2  justify-center rounded`}>
      <ItemLesson item={item?.item} />
    </View>
  );
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  if (isLoading) {
    return <MyLoadingFull text={'??ang t???i d??? li???u...'} />;
  } else {
    return (
      <View style={tw`flex-1`}>
        <View
          style={[
            tw`flex-1 pt-5 bg-${theme.bg} border-t border-t-gray-border pb-5`,
          ]}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isRefetchingByUser}
                onRefresh={refetchByUser}
              />
            }
            showsVerticalScrollIndicator={false}
            data={list()}
            renderItem={renderItem}
            keyExtractor={item => item?.lessonId}
            onEndReached={loadMore}
            ListFooterComponent={renderLoader}
          />
          {/* <MyButton title={'Continue Course'} /> */}
        </View>
      </View>
    );
  }
}

export default Lessons;
