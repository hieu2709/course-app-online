import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from '~/base/Icon';
import ButtonBack from '~/components/ButtonBack';
import MyButton from '~/components/MyButton';
import MyImage from '~/components/MyImage';
import MyTextInput from '~/components/MyTextInput';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import ModalCenter from '~/modals/ModalCenter';
import * as ImagePicker from 'expo-image-picker';
import MyLoadingFull from '~/base/components/MyLoadingFull';
import MyDateTimePicker from '~/base/components/MyDateTimePicker';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '~/firebase/config';
import useUser from '~/hooks/useUser';
import MyDropSelectGender from '../Auth/components/MyDropSelectGender';
import MyToast from '~/base/components/MyToast';

function EditProfile({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const { user, setUser } = useUser();
  const modalEditAvatarRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const dobRef = useRef();
  const toastRef = useRef();
  const pickImage = async () => {
    setIsLoading(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);
    if (!result.cancelled) {
      modalEditAvatarRef?.current?.closeModal();
      setAvatar(result.uri);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dob: new Date(user?.dob?.seconds * 1000 || user?.dob),
      fullname: user?.fullname,
      gender:
        user?.gender === 1
          ? { key: 1, name: 'Male' }
          : { key: 2, name: 'Female' },
    },
  });

  const handleEditAvatar = () => {
    modalEditAvatarRef?.current?.openModal();
  };
  const onSubmit = async data => {
    setIsLoading(true);
    const params = {
      ...data,
      gender: data?.gender?.key,
    };
    // console.log(params);
    try {
      await setDoc(doc(db, 'users', user?.username), params, { merge: true });
      setUser({
        ...user,
        ...params,
      });
      toastRef?.current?.open(true, 'Edit successfully!');
      setIsLoading(false);
    } catch (e) {
      console.log('error edit profile', e);
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <ModalCenter
        loading={isLoading && <MyLoadingFull />}
        ref={modalEditAvatarRef}>
        <View style={tw`mx-5 my-5`}>
          <TouchableOpacity style={tw`py-2 `}>
            <Text
              style={tw`text-${theme.text} text-center font-qs-semibold text-base`}>
              Camera
            </Text>
          </TouchableOpacity>
          <View style={tw`w-full h-[1px] bg-${theme.text}`} />
          <TouchableOpacity
            style={tw`py-2 `}
            onPress={() => {
              pickImage();
            }}>
            <Text
              style={tw`text-${theme.text} text-center font-qs-semibold text-base`}>
              Select from gallery
            </Text>
          </TouchableOpacity>
        </View>
      </ModalCenter>
      <ButtonBack style={tw`pt-3 pl-5`} title={'Fill Your Profile'} />
      <MyToast ref={toastRef} />
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback style={tw`flex-1`} onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={tw`flex-1`}>
              <MyToast ref={toastRef} style={tw`top-0`} />
              <View style={tw`flex-1 px-5 mt-5 items-center`}>
                <View style={tw`mb-5`}>
                  <MyImage
                    src={avatar && { uri: avatar }}
                    style={tw`w-30 h-30 rounded-full `}
                  />

                  <TouchableOpacity
                    onPress={handleEditAvatar}
                    style={tw`bg-blue w-7 h-7 items-center justify-center rounded-lg absolute right-0 bottom-0`}>
                    <Icon
                      type="FontAwesome5"
                      name="pencil-alt"
                      size={16}
                      color={tw.color('white')}
                    />
                  </TouchableOpacity>
                </View>
                <Controller
                  name="fullname"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MyTextInput
                      capitalize={true}
                      placeholder={'Full Name'}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <Controller
                  name="dob"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MyDateTimePicker
                      ref={dobRef}
                      value={value}
                      onChange={d => onChange(d)}
                      style={tw`w-full`}
                    />
                  )}
                />

                <Controller
                  name="gender"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MyDropSelectGender
                      value={value}
                      onChange={item => onChange(item)}
                    />
                  )}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <MyButton
        style={tw`mb-15 mx-5`}
        title={'Update'}
        onPress={handleSubmit(onSubmit)}
      />
      {isLoading && <MyLoadingFull text={'Editing Profile...'} />}
    </Container>
  );
}

export default EditProfile;
