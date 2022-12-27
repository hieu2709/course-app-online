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
} from 'firebase/firestore';
import React from 'react';
import { Text, View, FlatList, RefreshControl } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { useRefreshByUser } from '~/utils/hooks';
import MentorItem from '../All/components/MentorItem';

function SearchMentor({ searchValue }) {
  const { theme } = useTheme();
  const { search } = searchValue || {};
  const ref = query(collection(db, 'mentors'), orderBy('dateCreated'));
  const { data, isLoading, refetch } = useFirestoreQuery(
    ['mentor-search'],
    ref,
  );
  const list = () => {
    let paginatedData = [];

    data?.docs?.forEach(char => {
      if (search) {
        if (
          char
            ?.data()
            ?.mentorName?.toLowerCase()
            ?.indexOf(search?.toLowerCase()) > -1
        ) {
          paginatedData.push(char?.data());
        }
      } else {
        paginatedData.push(char?.data());
      }
    });

    return paginatedData;
  };

  const renderItem = item => (
    <View
      style={tw`bg-${
        item?.index % 2 === 0 ? theme.bg : theme.bgInput
      }  my-1 py-2  justify-center rounded`}>
      <MentorItem id={item?.item?.mentorID} />
    </View>
  );
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  if (isLoading) {
    return <MyLoading text={'Đang tìm kiếm'} />;
  } else {
    return (
      <View style={tw`flex-1 mt-2 mb-2`}>
        <View style={tw`h-10 mx-5 items-center justify-center mt-2`}>
          <Text style={tw`font-qs-bold text-blue text-lg`}>Giáo viên</Text>
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
          keyExtractor={item => item?.mentorID}
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

export default SearchMentor;
