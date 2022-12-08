import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import tw from '~/libs/tailwind';
import LoadingIcon from '../LoadingIcon';

function MyLoadingFull() {
  return (
    <View style={tw`w-full h-full  absolute items-center justify-center`}>
      <View
        style={tw`w-40 rounded h-20 bg-[#0000001A] justify-center items-center`}>
        <LoadingIcon style={tw`w-20 h-20`} />
      </View>
    </View>
  );
}

export default MyLoadingFull;
