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
import MyDropSelectGender from './components/MyDropSelectGender';
import AlertMessage from '~/components/AlertMessage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage } from '~/firebase/config';
import useUser from '~/hooks/useUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import CameraScreen from '../CameraScreen';

function FillProfile({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCamera, setIsCamera] = useState(false);
  const { theme } = useTheme();
  const { setUser } = useUser();
  const { username, password, isRemember } = route?.params;
  const modalEditAvatarRef = useRef();
  const alertRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const dobRef = useRef();
  const pickImage = async () => {
    setIsLoading(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
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
  const setUserStorage = async id => {
    try {
      await AsyncStorage.setItem('user', id.toString());
    } catch (e) {
      console.log('error setItem:', e);
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dob: new Date(),
    },
  });
  const handleEditAvatar = () => {
    modalEditAvatarRef?.current?.openModal();
  };
  const docRef = doc(db, 'users', '0');
  const uploadPhotoAsync = async uri => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const response = await fetch(uploadUri);
    const blob = await response.blob();
    const docSnap = await getDoc(docRef);
    const id = docSnap.exists() ? docSnap?.data()?.id + 1 : 0;
    const storageRef = ref(storage, `photos/${id}.jpg`);
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg',
    };
    // uploadBytes(storageRef, blob, metadata)
    //   .then(async snapshot => {
    //     const url = await getDownloadURL(storageRef);
    //     setUrlAvatar(url);
    //   })
    //   .catch(e => console.log('err', e));
    await uploadBytes(storageRef, blob, metadata);
    const url = await getDownloadURL(storageRef);
    return url;
  };
  const onSubmit = async data => {
    // console.log(data);
    setIsLoading(true);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const id = docSnap?.data()?.id + 1;
      if (avatar) {
        const url = await uploadPhotoAsync(avatar);
        const params = {
          ...data,
          username,
          password,
          gender: data?.gender?.key,
          coins: 0,
          userId: id,
          avatar: url,
        };
        try {
          await setDoc(doc(db, 'users', id?.toString()), params);
          await setDoc(doc(db, 'users', '0'), { id: id });
          if (isRemember) {
            setUserStorage(id);
          }
          setIsLoading(false);
          alertRef?.current?.openModal();
          setTimeout(() => {
            alertRef?.current?.closeModal();
            setUser(params);
          }, 2000);
        } catch (e) {
          console.log('error register', e);
          setIsLoading(false);
        }
      } else {
        const params = {
          ...data,
          username,
          password,
          gender: data?.gender?.key,
          coins: 0,
          userId: id,
          avatar: null,
        };
        try {
          await setDoc(doc(db, 'users', id?.toString()), params);
          await setDoc(doc(db, 'users', '0'), { id: id });
          if (isRemember) {
            setUserStorage(id);
          }
          setIsLoading(false);
          alertRef?.current?.openModal();
          setTimeout(() => {
            alertRef?.current?.closeModal();
            setUser(params);
          }, 2000);
        } catch (e) {
          console.log('error register', e);
          setIsLoading(false);
        }
      }
    }
  };
  const openCamera = () => {
    modalEditAvatarRef?.current?.closeModal();
    setIsCamera(true);
  };
  return (
    <Container>
      {!isCamera ? (
        <View style={tw`flex-1`}>
          <ModalCenter
            loading={isLoading && <MyLoadingFull />}
            ref={modalEditAvatarRef}>
            <View style={tw`mx-5 my-5`}>
              <TouchableOpacity style={tw`py-2 `} onPress={openCamera}>
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
                  Chọn từ thư viện
                </Text>
              </TouchableOpacity>
            </View>
          </ModalCenter>
          <ButtonBack style={tw`pt-3 pl-5`} title={'Nhập thông tin của bạn'} />
          <KeyboardAvoidingView
            style={tw`flex-1`}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback
              style={tw`flex-1`}
              onPress={Keyboard.dismiss}>
              <ScrollView>
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
                        placeholder={'Tên đầy đủ'}
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
                        value={new Date()}
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
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          <MyButton
            style={tw`mb-15 mx-5`}
            title={'Hoàn tất'}
            onPress={handleSubmit(onSubmit)}
          />
          <AlertMessage
            ref={alertRef}
            title={'Chúc mừng!'}
            message="Tài khoản của bạn đã sẵn sàng để sử dụng. Bạn sẽ được chuyển hướng đến trang chủ sau vài giây."
            icon={
              <Icon
                type="FontAwesome"
                name="user"
                size={50}
                color={tw.color('white')}
              />
            }
          />
          {isLoading && <MyLoadingFull text={'Đang tạo tài khoản...'} />}
        </View>
      ) : (
        <CameraScreen setData={setAvatar} setVisible={setIsCamera} />
      )}
    </Container>
  );
}

export default FillProfile;
