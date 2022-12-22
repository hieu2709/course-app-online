import React from 'react';
import { View } from 'react-native';
import useCourse from '~/hooks/useCourse';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import MyTabBarReview from './MyTabBarReview';
function Reviews() {
  const { theme } = useTheme();
  const { course } = useCourse();
  return (
    <View style={tw`flex-1`}>
      <MyTabBarReview courseId={course?.courseID} />
    </View>
  );
}

export default Reviews;
