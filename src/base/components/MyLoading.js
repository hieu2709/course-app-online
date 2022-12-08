import React from 'react';
import { Text, View } from 'react-native';
import tw from '~/libs/tailwind';
import LoadingIcon from '../LoadingIcon';

function MyLoading({ text }) {
  return (
    <View style={tw`w-full items-center`}>
      <View style={tw`justify-center items-center w-full`}>
        <LoadingIcon style={tw`w-20 py-10`} />
        {text && (
          <Text style={tw`font-qs-bold text-blue text-center`}>{text}</Text>
        )}
      </View>
    </View>
  );
}

export default MyLoading;
