import React from 'react';
import { ScrollView, View } from 'react-native';
import tw from '~/libs/tailwind';
import Courses from '../components/Courses';

const listCourse = [
  {
    image:
      'https://assets-global.website-files.com/5e39e095596498a8b9624af1/5ffca6e3e0d8ad9231cc2af6_Portfolio-course---final.png',
    courseName: '3D Design Illustration',
    totalTime: 145,
    totalLesson: 178,
    progress: 178,
  },
  {
    image:
      'https://assets-global.website-files.com/5e39e095596498a8b9624af1/5ffca6e3e0d8ad9231cc2af6_Portfolio-course---final.png',
    courseName: 'CRM Management',
    totalTime: 145,
    totalLesson: 178,
    progress: 178,
  },
  {
    image:
      'https://assets-global.website-files.com/5e39e095596498a8b9624af1/5ffca6e3e0d8ad9231cc2af6_Portfolio-course---final.png',
    courseName: 'Flutter Mobile Apps',
    totalTime: 145,
    totalLesson: 110,
    progress: 110,
  },
  {
    image:
      'https://assets-global.website-files.com/5e39e095596498a8b9624af1/5ffca6e3e0d8ad9231cc2af6_Portfolio-course---final.png',
    courseName: '3D Icons Set Blender',
    totalTime: 145,
    totalLesson: 67,
    progress: 67,
  },
];
function Completed() {
  return (
    <View style={tw`flex-1`}>
      <ScrollView
        contentContainerStyle={tw`pt-5`}
        showsVerticalScrollIndicator={false}>
        {listCourse?.map((item, i) => (
          <Courses key={i} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Completed;
