import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import MyImage from '../MyImage';

function StudentItem({ item }) {
  const { theme } = useTheme();
  return (
    <View
      style={tw`flex-row items-center justify-between px-5 shadow bg-${theme.bg} mb-2 py-3`}>
      <View style={tw`flex-row items-center`}>
        <MyImage
          src={{ uri: item.avatar }}
          style={tw`w-12 h-12 rounded-full`}
        />
        <View style={tw`ml-4`}>
          <Text style={tw`font-qs-bold text-base text-${theme.text}`}>
            {item.name || ''}
          </Text>
          <Text style={tw`font-qs-regular text-sm text-${theme.text}`}>
            {item.role || ''}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Icon
          type="AntDesign"
          name="message1"
          size={26}
          color={tw.color('blue')}
        />
      </TouchableOpacity>
    </View>
  );
}

export default StudentItem;
