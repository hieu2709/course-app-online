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
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import tw from '~/libs/tailwind';
import { useRefreshByUser } from '~/utils/hooks';
function AllLesson({ navigation, route }) {
  const { theme } = useTheme();
  const { course } = route.params || '';
  const title = course?.courseName || 'Các bài học';
  const lessonsRef = collection(db, 'lessons');
  const ref = query(
    lessonsRef,
    where('courseId', '==', course?.courseID || ''),
    orderBy('index'),
    limit(7),
  );
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useFirestoreInfiniteQuery(
      ['lessons-infinite', course?.courseID],
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
    return <MyLoadingFull text={'Đang tải dữ liệu...'} />;
  } else {
    return (
      <Container>
        <Header
          title={title}
          // rightIcon={
          //   <TouchableOpacity
          //     style={tw`h-6 w-6 justify-center items-center rounded-full border-[1.5px] border-${theme.text}`}>
          //     <Icon
          //       type="MaterialIcons"
          //       name="more-horiz"
          //       size={16}
          //       color={theme.text}
          //     />
          //   </TouchableOpacity>
          // }
        />
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
        {/* <ButtonEnrolCourse /> */}
      </Container>
    );
  }
}

export default AllLesson;
