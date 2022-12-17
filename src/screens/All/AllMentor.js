import { useFirestoreInfiniteQuery } from '@react-query-firebase/firestore';
import { collection, limit, query, startAfter } from 'firebase/firestore';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import MyLoadingFull from '~/base/components/MyLoadingFull';
import Icon from '~/base/Icon';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import tw from '~/libs/tailwind';
import MentorItem from './components/MentorItem';

function AllMentor() {
  const { theme } = useTheme();
  const collectionRef = collection(db, 'mentors');
  const mentorQuery = query(collectionRef, limit(2));
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useFirestoreInfiniteQuery('mentors-infinite', mentorQuery, snapshot => {
      const lastDocument = snapshot.docs[snapshot.docs.length - 1];
      if (!lastDocument) {
        return;
      } else {
        return query(mentorQuery, startAfter(lastDocument));
      }
    });
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
      <MentorItem id={item?.item?.mentorID} />
    </View>
  );
  if (isLoading) {
    return <MyLoadingFull text={'Đang tải dữ liệu'} />;
  } else {
    return (
      <Container>
        <Header
          title={'Tất cả giáo viên'}
          rightIcon={
            <TouchableOpacity>
              <Icon
                type="MaterialIcons"
                name="more-horiz"
                size={30}
                color={`${theme.text}`}
              />
            </TouchableOpacity>
          }
        />
        <FlatList
          data={list()}
          renderItem={renderItem}
          keyExtractor={item => item?.mentorID}
          onEndReached={loadMore}
          ListFooterComponent={renderLoader}
        />
      </Container>
    );
  }
}

export default AllMentor;