import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '~/libs/tailwind';

function MyButton({ title, style, onPress, titleColor, leftIcon }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw` h-15 bg-blue justify-center items-center rounded-full shadow-lg shadow-blue`,
        style,
      ]}>
      <View style={tw`flex-row items-center`}>
        {leftIcon}
        <Text
          style={tw`font-qs-bold text-lg ml-2 text-[${
            titleColor || tw.color('white')
          }]`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default MyButton;
