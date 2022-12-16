import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { convertMintoHrs } from '~/utils';

function ItemLesson({ item, style, index }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const gotoDetailLesson = () => {
    navigation.navigate('DetailLesson', {
      data: item,
      index: index + 1,
    });
  };
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
            {item.lessonId < 10 ? `0${item.lessonId}` : item.lessonId}
          </Text>
        </View>
        <View style={tw`justify-between ml-4`}>
          <Text
            numberOfLines={1}
            style={tw`font-qs-bold text-base  w-55 text-${theme.text}`}>
            {item.lessonName}
          </Text>
          <Text style={tw`font-qs-medium text-${theme.text}`}>
            {convertMintoHrs(item.time)}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={tw`shadow-xl`} onPress={gotoDetailLesson}>
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
