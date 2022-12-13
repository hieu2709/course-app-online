import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '~/libs/tailwind';

function Container({ children }) {
  const inset = useSafeAreaInsets();
  const top = Number(inset.top / 4);
  return <View style={tw`flex-1 bg-primary pt-${top}`}>{children}</View>;
}

export default Container;
