import React from 'react';
import { useFirestoreInfiniteQuery } from '@react-query-firebase/firestore';
import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import ItemReview from '~/components/Review/ItemReview';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useRefreshByUser } from '~/utils/hooks';

function ReviewSearch({ rateSearch, courseId, index }) {
  const { theme } = useTheme();
  const reviewRef = rateSearch
    ? query(
        collection(db, 'myreview'),
        where('courseId', '==', courseId),
        where('rate', '==', rateSearch),
        orderBy('dateUpdated', 'desc'),
        limit(3),
      )
    : query(
        collection(db, 'myreview'),
        where('courseId', '==', courseId),
        orderBy('dateUpdated', 'desc'),
        limit(3),
      );

  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useFirestoreInfiniteQuery(
      ['review-infinite', courseId?.toString() + '-' + rateSearch?.toString()],
      reviewRef,
      snapshot => {
        const lastDocument = snapshot.docs[snapshot.docs.length - 1];
        if (!lastDocument) {
          return;
        } else {
          return query(reviewRef, startAfter(lastDocument));
        }
      },
    );
  useFocusEffect(
    useCallback(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, refetch]),
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
    // console.log(hasNextPage);
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
    return (
      <View
        style={tw` bg-${item?.index % 2 === 0 ? theme.bg : theme.bgInput} `}>
        <ItemReview review={item?.item} refetch={refetch} />
      </View>
    );
  };
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  if (isLoading) {
    return <MyLoading text={'??ang t???i d??? li???u'} />;
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
          keyExtractor={(item, i) => i}
          onEndReached={loadMore}
          ListFooterComponent={renderLoader}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListEmptyComponent={() => (
            <View>
              <Text style={tw`font-qs-semibold text-base text-center`}>
                Ch??a c?? ????nh gi?? n??o
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default ReviewSearch;
