import React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import tw from '~/libs/tailwind';
import { useEffect } from 'react';
import Icon from '~/base/Icon';
import { useRef } from 'react';
import Container from '~/layouts/Container';

function CameraScreen({ setVisible, setData }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(null);
  const [photo, setPhoto] = useState();
  const cameraRef = useRef();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);
  const toggleCameraType = () => {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  };
  const takePicture = async () => {
    let options = {
      quality: 0.2,
      base64: true,
      exif: false,
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };
  const handleBack = () => {
    setPhoto(false);
  };
  const handleSubmit = () => {
    setData(photo.uri);
    setVisible(false);
    // navigation.navigate(screenName, { photo: photo.uri });
  };
  if (permission === null) {
    return <View />;
  }
  if (permission === false) {
    setVisible?.(false);
  }

  return (
    <View style={tw`flex-1 `}>
      {photo ? (
        <Container>
          <View style={tw`flex-1`}>
            <Image
              style={tw`w-full h-full`}
              source={{ uri: photo.uri }}
              resizeMode="cover"
            />
          </View>
          <View
            style={tw`flex-row h-30 bg-[#000] justify-between px-5 items-center`}>
            <TouchableOpacity
              style={tw`border-2 border-red rounded-xl px-5 py-2`}
              onPress={handleBack}>
              <Text style={tw`font-qs-bold text-red text-lg`}>Quay lại</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`border-2 border-blue rounded-xl px-5 py-2`}
              onPress={handleSubmit}>
              <Text style={tw`font-qs-bold text-blue text-lg`}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </Container>
      ) : (
        <Camera ref={cameraRef} style={tw`flex-1 justify-end`} type={type}>
          <View style={tw`bg-[#000] h-30 flex-row justify-center pt-5`}>
            <TouchableOpacity
              style={tw`w-17 h-17 rounded-full bg-white justify-center items-center`}
              onPress={takePicture}>
              <View
                style={tw`w-16 h-16 rounded-full bg-white border-2 border-black`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`absolute right-10 top-8`}
              onPress={toggleCameraType}>
              <Icon
                type="MaterialIcons"
                name="flip-camera-ios"
                size={40}
                color={tw.color('white')}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

export default CameraScreen;
