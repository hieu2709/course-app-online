import React from 'react';
import { View } from 'react-native';
import useCourse from '~/hooks/useCourse';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { formatNumber } from '~/utils';
import MyButton from './MyButton';

function ButtonEnrolCourse({ onPress }) {
  const { theme } = useTheme();
  const { course } = useCourse();

  return (
    <View
      style={[tw`mx-5 pt-5 bg-${theme.bg} border-t border-t-gray-border pb-5`]}>
      <MyButton
        title={`Tham gia ngay - ${formatNumber(course?.price)} đ`}
        onPress={onPress}
      />
    </View>
  );
}

export default ButtonEnrolCourse;
