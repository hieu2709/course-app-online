import React from 'react';
import { View } from 'react-native';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import MyButton from './MyButton';

function ButtonEnrolCourse() {
  const theme = useTheme();
  return (
    <View
      style={[tw`mx-5 pt-5 bg-${theme.bg} border-t border-t-gray-border pb-5`]}>
      <MyButton title={'Enroll Course'} />
    </View>
  );
}

export default ButtonEnrolCourse;
