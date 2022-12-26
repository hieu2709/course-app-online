import {
  useFirestoreInfiniteQuery,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import {
  collection,
  endAt,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';
import React from 'react';
import { Text, View, FlatList } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import ItemCourse from '~/components/Course/ItemCourse';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function SearchCourse({ search, categoryId }) {
  const { theme } = useTheme();
  const ref =
    categoryId === 0
      ? query(
          collection(db, 'courses'),
          orderBy('courseName'),
          startAt(`${search}`),
          endAt(search + '\uf8ff'),
          limit(4),
        )
      : query(
          collection(db, 'courses'),
          orderBy('courseName'),
          startAt(`${search}`),
          endAt(search + '\uf8ff'),
          where('categoryId', '==', categoryId),
          limit(4),
        );
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useFirestoreInfiniteQuery(
      ['course-search-infinite', search, categoryId],
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
  const renderItem = item => <ItemCourse courseId={item?.item?.courseID} />;
  if (isLoading) {
    return <MyLoading text={'Đang tìm kiếm'} />;
  } else {
    return (
      <View style={tw`flex-1 mt-2 mb-2`}>
        <View style={tw`h-10 mx-5 items-center justify-center mt-2`}>
          <Text style={tw`font-qs-bold text-blue text-lg`}>Khóa học</Text>
        </View>
        <View style={tw`mx-5 rounded-full h-1 bg-blue`} />
        <FlatList
          data={list()}
          renderItem={renderItem}
          keyExtractor={item => item?.courseID}
          onEndReached={loadMore}
          ListFooterComponent={renderLoader}
        />
      </View>
    );
  }
}

export default SearchCourse;
