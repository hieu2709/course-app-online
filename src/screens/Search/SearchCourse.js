import {
  useFirestoreInfiniteQuery,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import React from 'react';
import { Text, View, FlatList, RefreshControl } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import ItemCourse from '~/components/Course/ItemCourse';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { useRefreshByUser } from '~/utils/hooks';

function SearchCourse({ searchValue }) {
  const { theme } = useTheme();
  const { search, cateSelect, low, high } = searchValue || {};
  const ref =
    cateSelect === 0
      ? query(collection(db, 'courses'), orderBy('dateCreated'))
      : query(
          collection(db, 'courses'),
          orderBy('dateCreated'),
          where('categoryId', '==', cateSelect),
        );

  const { data, isLoading, refetch } = useFirestoreQuery(
    ['course-search', cateSelect?.toString()],
    ref,
  );
  const list = () => {
    let paginatedData = [];
    data?.docs?.forEach(char => {
      if (search) {
        if (
          char
            ?.data()
            ?.courseName?.toLowerCase()
            ?.indexOf(search?.toLowerCase()) > -1
        ) {
          if (low === 0) {
            paginatedData.push(char?.data());
          } else {
            if (char?.data()?.price >= low && char?.data()?.price <= high) {
              paginatedData.push(char?.data());
            }
          }
        }
      } else {
        if (low === 0) {
          paginatedData.push(char?.data());
        } else {
          if (char?.data()?.price >= low && char?.data()?.price <= high) {
            paginatedData.push(char?.data());
          }
        }
      }
    });
    return paginatedData;
  };

  const renderItem = item => <ItemCourse courseId={item?.item?.courseID} />;
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
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
          contentContainerStyle={tw`pb-10`}
          refreshControl={
            <RefreshControl
              refreshing={isRefetchingByUser}
              onRefresh={refetchByUser}
            />
          }
          data={list()}
          renderItem={renderItem}
          keyExtractor={item => item?.courseID}
          ListEmptyComponent={
            <View>
              <Text
                style={tw`font-qs-semibold text-base text-center mt-2 text-${theme.text}`}>
                Không tìm thấy kết quả nào
              </Text>
            </View>
          }
        />
      </View>
    );
  }
}

export default SearchCourse;
