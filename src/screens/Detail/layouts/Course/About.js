import React from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '~/base/Icon';
import MyImage from '~/components/MyImage';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import ReadMore from '@fawazahmed/react-native-read-more';
import { useNavigation } from '@react-navigation/native';
import useCourse from '~/hooks/useCourse';
import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/firebase/config';
import { useEffect } from 'react';
import { useCallback } from 'react';

function About() {
  const { theme } = useTheme();
  const { course } = useCourse();
  const navigation = useNavigation();
  const [mentor, setmentor] = useState({});
  const getMentor = useCallback(async () => {
    const q = query(
      collection(db, 'mentors'),
      where('mentorID', '==', course.mentorID),
    );
    const querySnap = await getDocs(q);
    querySnap.forEach(d => {
      setmentor(d.data());
      return;
    });
  }, [course.mentorID]);
  useEffect(() => {
    getMentor();
  }, [getMentor]);
  const goToDetailMentor = item => {
    navigation.navigate('DetailMentor', {
      data: item,
    });
  };
  return (
    <View style={tw`flex-1 `}>
      <ScrollView
        style={tw`flex-1`}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Text style={tw`font-qs-bold pt-5 pl-5 text-lg text-${theme.text}`}>
          Mentor
        </Text>
        <View style={tw`flex-row justify-between items-center px-5 pt-3`}>
          <TouchableOpacity
            onPress={() => goToDetailMentor(mentor)}
            style={tw`flex-row items-center `}>
            <MyImage
              src={{
                uri: mentor.avatar,
              }}
              style={tw`h-14 w-14 rounded-full`}
            />
            <View style={tw`ml-5`}>
              <Text style={tw`font-qs-bold text-base text-${theme.text}`}>
                {mentor.mentorName}
              </Text>
              <Text
                numberOfLines={2}
                style={tw`font-qs-medium text-${theme.text}`}>
                {mentor.level}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={tw`px-5 pt-5`}>
          <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
            About Course
          </Text>
          <ReadMore
            numberOfLines={15}
            seeMoreText="Read more"
            seeLessText="Read less"
            seeMoreStyle={tw`text-green font-qs-bold`}
            seeLessStyle={tw`text-red font-qs-bold`}
            style={tw`mt-5 pb-5 font-qs-medium text-sm text-${theme.text}`}>
            {course.description || ''}
          </ReadMore>
        </View>
      </ScrollView>
    </View>
  );
}

export default About;
