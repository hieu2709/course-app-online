import ReadMore from '@fawazahmed/react-native-read-more';
import { async } from '@firebase/util';
import {
  useFirestoreDocument,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import dayjs from 'dayjs';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import React, { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import MyLoading from '~/base/components/MyLoading';
import Icon from '~/base/Icon';
import MyImage from '~/components/MyImage';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';
import ModalCenter from '~/modals/ModalCenter';
import ModalEditComment from './ModalEditComment';

function CommentItem({ item, refetch, inputRef, onChangeText }) {
  const { theme } = useTheme();
  const { user: currentUser } = useUser();
  const comment = item?.data();
  const modalRef = useRef();
  const userRef = doc(collection(db, 'users'), comment?.userId?.toString());
  const { data: user, isLoading } = useFirestoreDocument(
    ['user', comment?.userId],
    userRef,
    { subscribe: true },
  );
  const commentRef = doc(db, 'mycomment', item?.id);
  const mutation = useFirestoreDocumentMutation(
    commentRef,
    { merge: true },
    { onSettled: refetch },
  );
  const handleDeleteComment = async () => {
    await deleteDoc(commentRef);
    refetch();
  };
  const handleEditComment = () => {
    modalRef?.current?.openModal();
  };
  if (isLoading) {
    return <MyLoading />;
  } else {
    return (
      <View style={tw`flex-row items-start`}>
        <ModalCenter touchDisable={true} ref={modalRef}>
          <ModalEditComment
            modalRef={modalRef}
            mutation={mutation}
            value={comment?.comment}
            deleteComment={handleDeleteComment}
          />
        </ModalCenter>
        <MyImage style={tw`h-7 w-7 mr-2 rounded-full`} />
        <View
          style={tw`flex-1 bg-${theme.bgInput} px-2 rounded-xl pb-1 shadow flex-row justify-between`}>
          <View>
            <Text style={tw`font-qs-bold text-sm py-1`}>
              {user?.data()?.fullname}
            </Text>
            <ReadMore
              seeMoreText="Xem thêm"
              seeMoreStyle={tw`text-green`}
              seeLessText="Ẩn bớt"
              wrapperStyle={tw`flex-1`}
              numberOfLines={2}
              style={tw`font-qs-medium text-sm`}>
              {comment?.comment}
            </ReadMore>
            <Text style={tw`font-qs-semibold text-xs text-gray mt-1`}>
              {dayjs(
                new Date(
                  comment?.dateCreated?.seconds * 1000 || comment?.dateCreated,
                ),
              ).format('DD/MM/YYYY - HH:MM')}
            </Text>
          </View>
          {currentUser?.userId === user?.data()?.userId && (
            <Menu>
              <MenuTrigger>
                <View
                  style={tw`absolute top-[1.5] right-1 h-5 w-5 justify-center items-center rounded-full border-2 border-${theme.text} ml-3`}>
                  <Icon
                    type="MaterialIcons"
                    name="more-horiz"
                    size={14}
                    color={theme.text}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={tw`w-30 rounded-xl p-2`}>
                <MenuOption onSelect={handleEditComment}>
                  <Text style={tw`font-qs-semibold text-sm text-${theme.text}`}>
                    Chỉnh sửa
                  </Text>
                </MenuOption>
                <MenuOption onSelect={handleDeleteComment}>
                  <Text style={tw`font-qs-semibold text-sm text-red`}>Xóa</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          )}
        </View>
      </View>
    );
  }
}

export default CommentItem;
