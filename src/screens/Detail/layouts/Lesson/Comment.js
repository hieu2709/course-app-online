import {
  useFirestoreCollectionMutation,
  useFirestoreInfiniteQuery,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { TouchableOpacity, View, FlatList, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MyLoading from '~/base/components/MyLoading';
import MyToast from '~/base/components/MyToast';
import Icon from '~/base/Icon';
import MyTextInput from '~/components/MyTextInput';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';
import CommentItem from '../../components/CommentItem';

function Comment({ lessonId, videoRef, pause, resume }) {
  const { theme } = useTheme();
  const [comment, setComment] = useState('');
  const { user } = useUser();
  const toastRef = useRef();

  const myCommentRef = query(
    collection(db, 'mycomment'),
    where('lessonId', '==', lessonId),
    orderBy('dateCreated', 'desc'),
    limit(5),
  );
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useFirestoreInfiniteQuery(
      ['lesson-comment-infinite', lessonId],
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
    <View style={tw` mx-5 my-1 py-2  justify-center rounded`}>
      <CommentItem comment={item?.item} />
    </View>
  );

  const mutation = useFirestoreCollectionMutation(
    query(collection(db, 'mycomment')),
    {
      onSettled: refetch,
    },
  );
  const submitComment = () => {
    if (comment === '') {
      toastRef?.current?.open(false, 'Chưa nhập nội dung bình luận');
    } else {
      const param = {
        userId: user?.userId,
        lessonId: lessonId,
        dateCreated: Timestamp.fromDate(new Date()),
        comment: comment,
      };
      mutation?.mutate(param);
      setComment('');
      Keyboard.dismiss();
    }
  };
  if (isLoading) {
    return <MyLoading text={'Đang tải dữ liệu'} />;
  } else {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        horizontal={true}
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-1`}
        extraScrollHeight={10}>
        <View style={tw`flex-1`}>
          <MyToast ref={toastRef} />
          <FlatList
            style={tw`flex-1 mb-2`}
            contentContainerStyle={tw` pt-2  pb-5`}
            data={list()}
            renderItem={renderItem}
            keyExtractor={(item, i) => i}
            onEndReached={loadMore}
            ListFooterComponent={renderLoader}
          />
          <View style={tw` mb-5 pl-5 pr-2 flex-row `}>
            <MyTextInput
              value={comment}
              onChangeText={v => {
                setComment(v);
              }}
              placeholder={'Thêm bình luận...'}
              style={tw`h-10 shadow-xl  flex-1`}
              // onFocus={onFocusTextInput}
              // onBlur={onBlurTextInput}
            />
            <TouchableOpacity
              style={tw` h-10 justify-center px-3 shadow-xl`}
              onPress={submitComment}>
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
