import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MyButton from '~/components/MyButton';
import MyCheckBox from '~/components/MyCheckBox';
import MyTextInput from '~/components/MyTextInput';
import tw from '~/libs/tailwind';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import MyToast from '~/base/components/MyToast';
import { db } from '~/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import MyLoadingFull from '~/base/components/MyLoadingFull';

function Register({ navigation }) {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();
  const [isRemember, setIsRemember] = useState(false);
  const checkBoxRef = useRef();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const onSubmit = async data => {
    setIsLoading(true);
    const username = data?.username;
    const docRef = query(
      collection(db, 'users'),
      where('username', '==', username),
    );
    const docSnap = await getDocs(docRef);
    if (!docSnap.empty) {
      toastRef?.current?.open(false, 'Tên tài khoản đã tồn tại!');
    } else {
      navigation.navigate('FillProfile', {
        username,
        password: data?.password,
        isRemember,
      });
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback
          style={tw`flex-1 `}
          onPress={Keyboard.dismiss}>
          <View style={tw`flex-1 pt-${100}px px-5 bg-${theme.bg}`}>
            <MyToast ref={toastRef} />
            {/* <ButtonBack style={tw`mt-5`} /> */}
            <Text style={tw`font-qs-bold text-4xl text-${theme.text}`}>
              Tạo tài khoản
            </Text>
            <Text style={tw`font-qs-bold text-4xl text-${theme.text}`}>
              của bạn
            </Text>
            <View style={tw`mt-8`}>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <MyTextInput
                    placeholder={'Tên tài khoản'}
                    onChangeText={onChange}
                    value={value}
                    leftIcon={{
                      type: 'FontAwesome',
                      name: 'user',
                      size: 20,
                    }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <MyTextInput
                    isPassword={true}
                    placeholder={'Mật khẩu'}
                    onChangeText={onChange}
                    value={value}
                    leftIcon={{ type: 'FontAwesome', name: 'lock', size: 20 }}
                    rightIcon={{
                      type: 'Ionicons',
                      name: { eye: 'eye', eyeoff: 'eye-off' },
                      size: 20,
                      onPress: 'hidden',
                    }}
                  />
                )}
              />
              <View style={tw`flex-row justify-center mt-5 items-center`}>
                <TouchableOpacity
                  onPress={() => {
                    checkBoxRef?.current?.onPress();
                    setIsRemember(!isRemember);
                  }}
                  style={tw`flex-row items-center`}>
                  <MyCheckBox ref={checkBoxRef} />
                  <Text
                    style={tw`font-qs-semibold text-${theme.text} text-[16px] ml-3`}>
                    Nhớ đăng nhập
                  </Text>
                </TouchableOpacity>
              </View>
              <MyButton
                style={tw`mt-10`}
                title={'Đăng ký'}
                onPress={handleSubmit(onSubmit)}
                // onPress={test}
              />
              <View style={tw`flex-row justify-center items-center mt-22`}>
                <Text style={tw`font-qs-medium text-sm text-${theme.text}`}>
                  Bạn đã có tài khoản?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={tw`font-qs-bold ml-1 text-base text-blue`}>
                    Đăng nhập
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {isLoading && <MyLoadingFull text={'Please wait...'} />}
    </Container>
  );
}

export default Register;
