import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from '~/base/Icon';
import MyTextInput from '~/components/MyTextInput';
import tw from '~/libs/tailwind';

function Comment() {
  return (
    <KeyboardAwareScrollView
      style={tw`flex-1`}
      contentContainerStyle={tw`flex-1`}
      extraScrollHeight={10}>
      <View style={tw`flex-1`}>
        <View style={tw`absolute bottom-5 left-5 right-5 flex-row`}>
          <MyTextInput
            placeholder={'Thêm bình luận...'}
            style={tw`h-10 shadow-xl  flex-1`}
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

export default Comment;
