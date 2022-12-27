import {
  useFirestoreCollectionMutation,
  useFirestoreInfiniteQuery,
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
import React, { useRef, useState } from 'react';
import {
  Keyboard,
  FlatList,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MyLoading from '~/base/components/MyLoading';
import MyLoadingFull from '~/base/components/MyLoadingFull';
import MyToast from '~/base/components/MyToast';
import Icon from '~/base/Icon';
import MyTextInput from '~/components/MyTextInput';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';

import { useRefreshByUser } from '~/utils/hooks';
import NoteItem from '../../components/NoteItem';

function Note({ lessonId, videoRef, pause, resume }) {
  const { theme } = useTheme();
  const [note, setNote] = useState('');
  const { user } = useUser();
  const toastRef = useRef();
  const myNoteRef = query(
    collection(db, 'mynote'),
    where('lessonId', '==', lessonId),
    where('userId', '==', user?.userId),
    orderBy('dateCreated', 'asc'),
    limit(10),
  );
  const { data, isLoading, hasNextPage, fetchNextPage, refetch, isRefetching } =
    useFirestoreInfiniteQuery(
      [
        'lesson-note-infinite',
        lessonId?.toString() + '-' + user?.userId?.toString(),
      ],
      myNoteRef,
      snapshot => {
        const lastDocument = snapshot.docs[snapshot.docs.length - 1];
        if (!lastDocument) {
          return;
        } else {
          return query(myNoteRef, startAfter(lastDocument));
        }
      },
    );
  const list = () => {
    let paginatedData = [];
    data?.pages?.forEach(page => {
      page?.docs?.forEach(char => {
        paginatedData.push(char);
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
  const seekToTime = time => {
    videoRef?.current?.seekTo(time, true);
  };
  const renderItem = item => {
    return (
      <View
        style={tw`px-5 py-1 bg-${
          item?.index % 2 === 0 ? `${theme.bgInput}` : 'transparent'
        } justify-center `}>
        <NoteItem item={item?.item} seekTo={seekToTime} refetch={refetch} />
      </View>
    );
  };

  const mutation = useFirestoreCollectionMutation(
    query(collection(db, 'mynote')),
    {
      onSettled: refetch,
    },
  );
  const submitNote = () => {
    // console.log('submit');
    videoRef?.current
      ?.getCurrentTime()
      .then(time => {
        if (note) {
          mutation?.mutate({
            userId: user?.userId,
            lessonId,
            note,
            time,
            dateCreated: Timestamp.fromDate(new Date()),
          });
          setNote('');
          Keyboard.dismiss();
        } else {
          toastRef?.current?.open(false, 'Chưa nhập nội dung ghi chú');
        }
      })
      .catch(() =>
        toastRef?.current?.open(
          false,
          'Không thể tạo ghi chú khi chưa xem video',
        ),
      );
  };

  const onFocusTextInput = () => {
    pause?.();
  };
  const onBlurTextInput = () => {
    resume?.();
  };
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  if (isLoading) {
    return <MyLoading text={'Đang tải dữ liệu'} />;
  } else {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={tw`flex-1`}
        horizontal={true}
        contentContainerStyle={tw`flex-1`}
        extraScrollHeight={10}>
        <View style={tw`flex-1`}>
          <MyToast ref={toastRef} />
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isRefetchingByUser}
                onRefresh={refetchByUser}
              />
            }
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
              value={note}
              onChangeText={v => {
                setNote(v);
              }}
              placeholder={'Thêm ghi chú...'}
              style={tw`h-10 shadow-xl  flex-1`}
              onFocus={onFocusTextInput}
              onBlur={onBlurTextInput}
            />
            <TouchableOpacity
              style={tw` h-10 justify-center px-3 shadow-xl`}
              onPress={submitNote}>
              <Icon
                type="FontAwesome"
                name="send"
                size={20}
                color={tw.color('blue')}
              />
            </TouchableOpacity>
          </View>
          {isRefetching && <MyLoadingFull />}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Note;
