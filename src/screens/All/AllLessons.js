import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import ButtonEnrolCourse from '~/components/ButtonEnrollCourse';
import ItemLesson from '~/components/Lessons/ItemLesson';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
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
function AllLesson({ navigation, route }) {
  const theme = useTheme();
  const { data } = route.params || '';
  const title = data?.courseName || 'Lessons';
  return (
    <Container>
      <Header
        title={title}
        rightIcon={
          <TouchableOpacity
            style={tw`h-6 w-6 justify-center items-center rounded-full border-[1.5px] border-${theme.text}`}>
            <Icon
              type="MaterialIcons"
              name="more-horiz"
              size={16}
              color={theme.text}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView
        style={tw`flex-1`}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <View style={tw`mx-5 pt-1`}>
          {listLessons?.map((item, i) => (
            <ItemLesson key={i} item={item} style={tw`mb-5`} />
          ))}
        </View>
      </ScrollView>
      <ButtonEnrolCourse />
    </Container>
  );
}

export default AllLesson;
