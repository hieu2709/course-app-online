import React from 'react';
import { View } from 'react-native';
import ButtonBack from '~/components/ButtonBack';
import tw from '~/libs/tailwind';

function Header({ rightIcon, title }) {
  return (
    <View style={tw`flex-row justify-between items-center mx-5 py-5`}>
      <ButtonBack title={title || ''} />
      <View style={tw`flex-row items-center`}>{rightIcon}</View>
    </View>
  );
}

export default Header;
