import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function ItemLesson({ item, style }) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        tw`flex-row items-center justify-between p-5 rounded-xl shadow-lg bg-${theme.bgInput}`,
        style,
      ]}>
      <View style={tw`flex-row`}>
        <View
          style={tw`w-12 h-12 bg-blueOpacity rounded-full justify-center items-center`}>
          <Text style={tw`font-qs-bold text-lg text-blue`}>
            {item.id < 10 ? `0${item.id}` : item.id}
          </Text>
        </View>
        <View style={tw`justify-between ml-4`}>
          <Text style={tw`font-qs-bold text-base text-${theme.text}`}>
            {item.name}
          </Text>
          <Text style={tw`font-qs-medium text-${theme.text}`}>{item.time}</Text>
        </View>
      </View>
      <TouchableOpacity style={tw`shadow-xl`}>
        <Icon
          type="Ionicons"
          name="play-circle"
          size={40}
          color={tw.color('blue')}
        />
      </TouchableOpacity>
    </View>
  );
}

export default ItemLesson;
