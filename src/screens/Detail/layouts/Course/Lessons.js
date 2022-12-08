import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import ItemLesson from '~/components/Lessons/ItemLesson';

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

function Lessons({ onScroll }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const goToAllLessons = () => {
    navigation.navigate('AllLessons');
  };
  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-row justify-between items-center mt-5 mx-5 pb-2.5`}>
        <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
          124 Lessons
        </Text>
        <TouchableOpacity onPress={goToAllLessons}>
          <Text style={tw`font-qs-bold text-base text-blue`}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={tw`flex-1`}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <View style={tw`mx-5 pt-2.5`}>
          {listLessons?.map((item, i) => (
            <ItemLesson key={i} item={item} style={tw`mb-5`} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Lessons;
