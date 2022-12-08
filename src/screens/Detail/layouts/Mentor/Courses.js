import React from 'react';
import { View } from 'react-native';
import SceneCourse from '~/components/Course/SceneCourse';
import tw from '~/libs/tailwind';

function Courses() {
  return (
    <View style={tw`flex-1`}>
      <SceneCourse scrollEnable={true} />
    </View>
  );
}

export default Courses;
