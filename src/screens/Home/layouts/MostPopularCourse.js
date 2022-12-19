import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import TabBarCourse from '~/components/Course/TabBarCourse';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function MostPopularCourse({ style }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={[tw`flex-1`, style]}>
      <View style={tw`flex-row items-center justify-between px-5 mb-5`}>
        <Text style={tw`font-qs-bold text-${theme.text} text-lg`}>
          Khóa học phổ biến
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('MostPopularCourse')}>
          <Text style={tw`font-qs-bold text-blue text-base`}>Tất cả</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1`}>
        <TabBarCourse />
      </View>
    </View>
  );
}

export default MostPopularCourse;
