import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function RowSection({ icon, title, onPress }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row justify-between items-center mx-5 py-2.5 border-b-[0.2px] border-gray-border`}>
      <View style={tw`flex-row items-center`}>
        <View style={tw`w-10 justify-center`}>{icon}</View>
        <Text style={tw`font-qs-semibold text-base text-${theme.text}`}>
          {title}
        </Text>
      </View>
      <View>
        <Icon
          type="MaterialCommunityIcons"
          name="chevron-right"
          size={24}
          color={theme.text}
        />
      </View>
    </TouchableOpacity>
  );
}

export default RowSection;
