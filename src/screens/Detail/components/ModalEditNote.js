import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { collection, doc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from '~/base/Icon';
import MyButton from '~/components/MyButton';
import MyTextInput from '~/components/MyTextInput';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';
import { convertSecondtoHours } from '~/utils';

function ModalEditNote({ modalRef, mutation, value, deleteNote, time }) {
  const { theme } = useTheme();
  const [note, setNote] = useState(value);
  const { user } = useUser();
  const closeModal = () => {
    Keyboard.dismiss();
    modalRef?.current?.closeModal();
  };
  const submitComment = () => {
    if (note === '') {
      deleteNote?.();
    } else {
      mutation?.mutate({
        note,
      });
    }
    modalRef?.current?.closeModal();
  };
  return (
    <View style={tw`p-5`}>
      <Text style={tw`font-qs-bold text-center text-base`}>
        Ghi chú của bạn tại{' '}
        <Text style={tw`font-qs-bold text-base text-blue`}>
          {convertSecondtoHours(time)}
        </Text>
      </Text>
      <TextInput
        value={note}
        onChangeText={v => {
          setNote(v);
        }}
        multiline={true}
        autoFocus={true}
        selectTextOnFocus={true}
        style={tw`bg-${theme.bgInput} shadow-xl mt-5 h-20 text-${theme.text}  text-[16px] leading-[20px] font-qs-semibold p-3 rounded-xl`}
        placeholder="Viết ghi chú..."
        placeholderTextColor={tw.color('gray')}
      />

      <View style={tw` mb-10 mt-3 mb-10 flex-row items-center justify-between`}>
        <MyButton
          titleColor={tw.color('blue')}
          title={'Hủy'}
          style={tw` flex-1 bg-blueOpacity mr-2`}
          onPress={closeModal}
        />
        <MyButton
          title={'Sửa ghi chú'}
          style={tw` flex-1 ml-2`}
          onPress={submitComment}
        />
      </View>
    </View>
  );
}

export default ModalEditNote;
