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
import { useState } from 'react';
import { TouchableOpacity, View, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MyLoading from '~/base/components/MyLoading';
import Icon from '~/base/Icon';
import MyTextInput from '~/components/MyTextInput';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';
import CommentItem from '../../components/CommentItem';

function Comment({ lessonId, videoRef, pause, resume }) {
  const { theme } = useTheme();
  const [note, setNote] = useState('');
  const { user } = useUser();
  const myCommentRef = query(
    collection(db, 'mycomment'),
    where('lessonId', '==', lessonId),
    limit(5),
  );
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useFirestoreInfiniteQuery(
      'lesson-comment-infinite',
      myCommentRef,
      snapshot => {
        const lastDocument = snapshot.docs[snapshot.docs.length - 1];
        if (!lastDocument) {
          return;
        } else {
          return query(myCommentRef, startAfter(lastDocument));
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
  // console.log(list());
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
      <CommentItem comment={item?.item} />
    </View>
  );
  const onFocusTextInput = () => {
    pause?.();
  };
  const onBlurTextInput = () => {
    resume?.();
  };
  if (isLoading) {
    return <MyLoading text={'Đang tải dữ liệu'} />;
  } else {
    return (
      <KeyboardAwareScrollView
        horizontal={true}
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-1`}
        extraScrollHeight={10}>
        <View style={tw`flex-1`}>
          <FlatList
            style={tw`flex-1`}
            data={list()}
            renderItem={renderItem}
            keyExtractor={(item, i) => i}
            onEndReached={loadMore}
            ListFooterComponent={renderLoader}
          />
          <View style={tw`absolute bottom-5 left-5 right-5 flex-row`}>
            <MyTextInput
              value={note}
              onChangeText={v => {
                setNote(v);
              }}
              placeholder={'Thêm bình luận...'}
              style={tw`h-10 shadow-xl  flex-1`}
              onFocus={onFocusTextInput}
              onBlur={onBlurTextInput}
            />
            <TouchableOpacity style={tw` h-10 justify-center pl-3 shadow-xl`}>
              <Icon
                type="FontAwesome"
                name="send"
                size={20}
                color={tw.color('blue')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Comment;
