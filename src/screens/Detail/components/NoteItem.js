import ReadMore from '@fawazahmed/react-native-read-more';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from '~/base/Icon';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import ModalCenter from '~/modals/ModalCenter';
import { convertSecondtoHours } from '~/utils';
import ModalEditNote from './ModalEditNote';
function NoteItem({ item, seekTo, refetch }) {
  const n = item?.data();
  const { theme } = useTheme();
  const modalRef = useRef();
  const noteRef = doc(db, 'mynote', item?.id);
  const mutation = useFirestoreDocumentMutation(
    noteRef,
    { merge: true },
    { onSettled: refetch },
  );
  const handleEdit = () => {
    modalRef?.current?.openModal();
  };
  const handleDelete = async () => {
    await deleteDoc(noteRef);
    refetch();
  };
  return (
    <View style={tw`flex-row flex-1 justify-between`}>
      <ModalCenter touchDisable={true} ref={modalRef}>
        <ModalEditNote
          modalRef={modalRef}
          mutation={mutation}
          value={n?.note}
          time={n?.time}
          deleteNote={handleDelete}
        />
      </ModalCenter>
      <View style={tw`flex-row flex-1`}>
        <TouchableOpacity onPress={() => seekTo?.(n?.time)}>
          <Text style={tw`font-qs-semibold text-base text-blue`}>
            {convertSecondtoHours(n?.time)}
          </Text>
        </TouchableOpacity>
        <Text style={tw`font-qs-medium text-base text-${theme.text}`}> : </Text>
        <ReadMore
          seeMoreText="Xem thêm"
          seeMoreStyle={tw`text-green`}
          seeLessText="Ẩn bớt"
          numberOfLines={2}
          style={tw`font-qs-regular text-base text-${theme.text}`}
          wrapperStyle={tw`flex-1`}>
          {n?.note}
        </ReadMore>
      </View>

      <Menu>
        <MenuTrigger>
          <View
            style={tw` top-[0.5] right-1 h-5 w-5 justify-center items-center rounded-full border-2 border-${theme.text} ml-3`}>
            <Icon
              type="MaterialIcons"
              name="more-horiz"
              size={14}
              color={theme.text}
            />
          </View>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={tw`w-30 rounded-xl p-2`}>
          <MenuOption onSelect={handleEdit}>
            <Text style={tw`font-qs-semibold text-sm text-${theme.text}`}>
              Chỉnh sửa
            </Text>
          </MenuOption>
          <MenuOption onSelect={handleDelete}>
            <Text style={tw`font-qs-semibold text-sm text-red`}>Xóa</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}

export default NoteItem;
