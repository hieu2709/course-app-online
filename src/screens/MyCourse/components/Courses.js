import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { convertMintoHrs } from '~/utils';

function Courses({ item }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const percent = (
    ((item.progress || 0) / (item.totalLesson || 1)) *
    100
  ).toFixed(0);
  const color = () => {
    if (percent <= 25) {
      return 'green';
    } else if (percent <= 50) {
      return 'yellow';
    } else if (percent <= 75) {
      return 'orange';
    } else if (percent <= 99) {
      return 'red';
    } else {
      return 'blue';
    }
  };
  const goToDetail = () => {
    navigation.navigate('DetailMyCourse', {
      data: item,
    });
  };
  return (
    <TouchableOpacity
      onPress={goToDetail}
      style={tw`flex-row items-center mx-5 p-4 mb-5 rounded-2xl bg-${theme.bgInput} shadow-2xl`}>
      <Image style={tw`w-20 h-20 rounded-xl`} source={{ uri: item.image }} />
      <View style={tw`ml-4 flex-1`}>
        <Text
          numberOfLines={1}
          style={tw`font-qs-bold text-base text-${theme.text}`}>
          {item.courseName || ''}
        </Text>
        <Text style={tw`font-qs-regular text-sm text-${theme.text} mt-1`}>
          {convertMintoHrs(item.totalTime) || 0}
        </Text>
        <View style={tw`flex-row items-center`}>
          <View style={tw`flex-1 h-2 rounded-xl bg-gray-border`}>
            <View
              style={[tw`h-full rounded-xl bg-${color()} w-[${percent}%]`]}
            />
          </View>
          <Text
            style={tw`w-16 ml-2 font-qs-medium text-right text-${theme.text}`}>
            {item.progress || 0} / {item.totalLesson || 0}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Courses;
