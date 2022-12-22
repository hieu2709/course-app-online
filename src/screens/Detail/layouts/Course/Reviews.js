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
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import Icon from '~/base/Icon';
import RadioGroup from '~/components/RadioGroup';
import ItemReview from '~/components/Review/ItemReview';
import { db } from '~/firebase/config';
import useCourse from '~/hooks/useCourse';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { formatNumber } from '~/utils';
const rateList = [
  {
    name: 'All',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '5',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '4',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '3',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '2',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '1',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
];

function Reviews() {
  const { theme } = useTheme();
  const { course, review, rate } = useCourse();
  const reviewRef = query(
    collection(db, 'myreview'),
    where('courseId', '==', course?.courseID),
    orderBy('dateUpdated', 'desc'),
    limit(3),
  );
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useFirestoreInfiniteQuery(
      ['review-infinite', course?.courseID],
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
      <View style={tw`bg-${item?.index % 2 === 0 ? theme.bg : theme.bgInput} `}>
        <ItemReview review={item?.item} />
      </View>
    );
  };
  if (isLoading) {
    return <MyLoading />;
  } else {
    return (
      <View style={tw`flex-1`}>
        <View style={tw`flex-1`}>
          <View
            style={tw`flex-row items-center justify-between px-5 mt-5 mb-2`}>
            <View style={tw`flex-row items-center`}>
              {rate && (
                <Text style={tw`font-qs-bold text-lg mr-1 text-yellow`}>
                  {rate}
                </Text>
              )}
              {rate && (
                <Icon
                  type="AntDesign"
                  name="star"
                  size={26}
                  color={tw.color('yellow')}
                />
              )}
              <Text style={tw`font-qs-bold text-lg ml-3 text-${theme.text}`}>
                ({formatNumber(review)} đánh giá)
              </Text>
            </View>
            {/* <TouchableOpacity>
              <Text style={tw`font-qs-bold text-base text-blue`}>Tất cả</Text>
            </TouchableOpacity> */}
          </View>
          <View style={tw`mb-2`}>
            <RadioGroup data={rateList} horzital={true} />
          </View>
          <FlatList
            data={list()}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            onEndReached={loadMore}
            ListFooterComponent={renderLoader}
            // eslint-disable-next-line react/no-unstable-nested-components
            ListEmptyComponent={() => (
              <View>
                <Text style={tw`font-qs-semibold text-base text-center`}>
                  Chưa có đánh giá nào
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

export default Reviews;
