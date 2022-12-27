import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MyImage from '~/components/MyImage';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import ReadMore from '@fawazahmed/react-native-read-more';
import { useNavigation } from '@react-navigation/native';
import useCourse from '~/hooks/useCourse';
import { collection, doc } from 'firebase/firestore';
import { db } from '~/firebase/config';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import MyLoading from '~/base/components/MyLoading';

function About() {
  const { theme } = useTheme();
  const { course } = useCourse();
  const navigation = useNavigation();
  const q = doc(collection(db, 'mentors'), course?.mentorID?.toString());
  const { data: mentor, isLoading } = useFirestoreDocument(
    ['mentor', course?.mentorID?.toString()],
    q,
  );
  const goToDetailMentor = id => {
    navigation.navigate('DetailMentor', {
      dataId: id,
    });
  };
  if (isLoading) {
    return <MyLoading text={'Đang tải dữ liệu'} />;
  } else {
    return (
      <View style={tw`flex-1 `}>
        <ScrollView
          style={tw`flex-1`}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          <Text style={tw`font-qs-bold pt-5 pl-5 text-lg text-${theme.text}`}>
            Giáo viên
          </Text>
          <View style={tw`flex-row px-5 pt-3`}>
            <TouchableOpacity
              onPress={() => goToDetailMentor(mentor?.data()?.mentorID)}
              style={tw`flex-row flex-1 items-center `}>
              <MyImage
                src={{
                  uri: mentor?.data()?.avatar,
                }}
                style={tw`h-14 w-14 rounded-full`}
              />
              <View style={tw`ml-5`}>
                <Text style={tw`font-qs-bold text-base text-${theme.text}`}>
                  {mentor?.data()?.mentorName}
                </Text>
                <Text
                  numberOfLines={2}
                  style={tw`font-qs-medium text-${theme.text}`}>
                  {mentor?.data()?.level}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={tw`px-5 pt-5`}>
            <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
              Thông tin khóa học
            </Text>
            <ReadMore
              numberOfLines={15}
              seeMoreText="Xem tiếp"
              seeLessText="Thu gọn"
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
}

export default About;
