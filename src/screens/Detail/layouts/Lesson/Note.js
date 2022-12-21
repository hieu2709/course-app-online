import React, { useState } from 'react';
import { forwardRef } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from '~/base/Icon';
import MyTextInput from '~/components/MyTextInput';
import tw from '~/libs/tailwind';
import { convertSecondtoMin } from '~/utils';

function Note({ videoRef, pause, resume }) {
  const [note, setNote] = useState('');
  const submitNote = () => {
    videoRef?.current?.getCurrentTime().then(time => {
      console.log(convertSecondtoMin(time));
      console.log(note);
      setNote('');
      Keyboard.dismiss();
    });
  };
  const onFocusTextInput = () => {
    pause?.();
  };
  const onBlurTextInput = () => {
    resume?.();
  };
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={tw`flex-1`}
      contentContainerStyle={tw`flex-1`}
      extraScrollHeight={10}>
      <View style={tw`flex-1`}>
        <View style={tw`absolute bottom-5 left-0 right-0 pl-5 pr-2 flex-row `}>
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
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Note;
