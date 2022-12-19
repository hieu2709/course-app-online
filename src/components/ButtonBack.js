import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function ButtonBack({ style, title, iconColor, iconSize, onPress }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={style}>
      <TouchableOpacity
        style={tw`flex-row items-center`}
        onPress={() => {
          onPress?.();
          navigation.goBack();
        }}>
        <View style={tw`pr-4`}>
          <Icon
            type="Ionicons"
            name="arrow-back-sharp"
            size={iconSize || 26}
            color={iconColor || tw.color(`${theme.text}`)}
          />
        </View>
        <Text style={tw`font-qs-bold  text-xl text-${theme.text} `}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ButtonBack;
