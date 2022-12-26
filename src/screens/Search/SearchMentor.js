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
import MentorItem from '../All/components/MentorItem';

function SearchMentor({ search }) {
  const { theme } = useTheme();
  const ref = query(
    collection(db, 'mentors'),
    orderBy('mentorName'),
    startAt(`${search}`),
    endAt(search + '\uf8ff'),
    limit(4),
  );
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useFirestoreInfiniteQuery(
      ['mentor-search-infinite', search],
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
      }  my-1 py-2  justify-center rounded`}>
      <MentorItem id={item?.item?.mentorID} />
    </View>
  );
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
          data={list()}
          renderItem={renderItem}
          keyExtractor={item => item?.mentorID}
          onEndReached={loadMore}
          ListFooterComponent={renderLoader}
        />
      </View>
    );
  }
}

export default SearchMentor;
