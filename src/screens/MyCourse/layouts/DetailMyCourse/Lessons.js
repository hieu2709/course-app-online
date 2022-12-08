import React from 'react';
import { ScrollView, View } from 'react-native';
import ItemLesson from '~/components/Lessons/ItemLesson';
import MyButton from '~/components/MyButton';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

const listLessons = [
  {
    id: 1,
    name: 'Why Using Figma',
    video: '',
    time: '10 mins',
  },
  {
    id: 2,
    name: 'Why Using Figma',
    video: '',
    time: '10 mins',
  },
  {
    id: 3,
    name: 'Why Using Figma',
    video: '',
    time: '10 mins',
  },
  {
    id: 4,
    name: 'Why Using Figma',
    video: '',
    time: '10 mins',
  },
  {
    id: 5,
    name: 'Why Using Figma',
    video: '',
    time: '10 mins',
  },
  {
    id: 6,
    name: 'Why Using Figma',
    video: '',
    time: '10 mins',
  },
  {
    id: 7,
    name: 'Why Using Figma',
    video: '',
    time: '10 mins',
  },
  {
    id: 8,
    name: 'Why Using Figma',
    video: '',
    time: '10 mins',
  },
  {
    id: 9,
    name: 'Why Using Figma',
    video: '',
    time: '10 mins',
  },
  {
    id: 10,
    name: 'Why Using Figma',
    video: '',
    time: '10 mins',
  },
  {
    id: 11,
    name: 'Why Using Figma',
    video: '',
    time: '10 mins',
  },
  {
    id: 12,
    name: 'Why Using Figma',
    video: '',
    time: '10 mins',
  },
];
function Lessons() {
  const { theme } = useTheme();
  return (
    <View style={tw`flex-1`}>
      <ScrollView
        contentContainerStyle={tw`pt-5`}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <View style={tw`mx-5 pt-1`}>
          {listLessons?.map((item, i) => (
            <ItemLesson key={i} item={item} style={tw`mb-5`} />
          ))}
        </View>
      </ScrollView>
      <View
        style={[
          tw`mx-5 pt-5 bg-${theme.bg} border-t border-t-gray-border pb-5`,
        ]}>
        <MyButton title={'Continue Course'} />
      </View>
    </View>
  );
}

export default Lessons;
