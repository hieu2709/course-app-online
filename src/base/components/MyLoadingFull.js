import React from 'react';
import { View, Text } from 'react-native';
import tw from '~/libs/tailwind';
import LoadingIcon from '../LoadingIcon';
import { Dimensions } from 'react-native';
import { Portal } from 'react-native-paper';
function MyLoadingFull({ text }) {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return (
    <Portal>
      <View
        style={tw`w-[${width}px] h-[${height}px] absolute items-center justify-center `}>
        <View
          style={tw`w-40 rounded-xl py-2 bg-[#00000080] justify-center items-center`}>
          <LoadingIcon style={tw`w-20 py-10`} />
          {text && (
            <Text style={tw`font-qs-bold text-blue text-center`}>{text}</Text>
          )}
        </View>
      </View>
    </Portal>
  );
}

export default MyLoadingFull;
