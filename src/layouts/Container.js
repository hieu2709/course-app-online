import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function Container({ children }) {
  const inset = useSafeAreaInsets();
  const { theme } = useTheme();
  return (
    <View style={tw`flex-1 bg-${theme.bg} overflow-hidden`}>
      <View style={tw`bg-blue h-[${inset.top}px] w-full z-1000`} />
      {children}
    </View>
  );
}

export default Container;
