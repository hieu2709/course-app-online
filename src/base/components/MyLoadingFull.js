import React from 'react';
import { View, Text } from 'react-native';
import tw from '~/libs/tailwind';
import LoadingIcon from '../LoadingIcon';

function MyLoadingFull({ text }) {
  return (
    <View style={tw`w-full h-full absolute items-center justify-center`}>
      <View
        style={tw`w-40 rounded-xl py-2 bg-[#00000080] justify-center items-center`}>
        <LoadingIcon style={tw`w-20 py-10`} />
        {text && (
          <Text style={tw`font-qs-bold text-blue text-center`}>{text}</Text>
        )}
      </View>
    </View>
  );
}

export default MyLoadingFull;
