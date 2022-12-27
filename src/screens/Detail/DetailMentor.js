import {
  useFirestoreDocument,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import { collection, doc, query, where } from 'firebase/firestore';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MyLoadingFull from '~/base/components/MyLoadingFull';
import Icon from '~/base/Icon';
import MyImage from '~/components/MyImage';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import tw from '~/libs/tailwind';
import { formatNumber } from '~/utils';
import MyTabBar from './layouts/Mentor/MyTabBar';

function DetailMentor({ navigation, route }) {
  const { theme } = useTheme();
  const { dataId } = route.params || null;
  const collectionRef = collection(db, 'mentors');
  const ref = doc(collectionRef, dataId?.toString());
  const { data: mentor, isLoading } = useFirestoreDocument(
    ['mentor', dataId?.toString()],
    ref,
  );
  const courseRef = query(
    collection(db, 'courses'),
    where('mentorID', '==', dataId),
  );
  const { data: courseMentor, isLoading: isLoadingCourseMentor } =
    useFirestoreQuery(['course-mentor-detail', dataId?.toString()], courseRef);

  const classRef = query(
    collection(db, 'class'),
    where('mentorID', '==', dataId),
  );
  const { data: classMentor, isLoading: isLoadingClassMentor } =
    useFirestoreQuery(['class-mentor', dataId?.toString()], classRef);
  if (isLoading || isLoadingCourseMentor || isLoadingClassMentor) {
    return <MyLoadingFull text={'Đang tải dữ liệu...'} />;
  } else {
    return (
      <Container>
        <Header />
        <View style={tw`flex-1`}>
          <View style={tw`items-center`}>
            <MyImage
              src={{ uri: mentor?.data()?.avatar }}
              style={tw`h-24 w-24 rounded-full`}
            />
            <Text style={tw`mt-3 text-2xl font-qs-bold text-${theme.text}`}>
              {mentor?.data()?.mentorName}
            </Text>
            <Text
              style={tw`mt-2 text-base font-qs-semibold mx-14 text-center text-${theme.text}`}>
              {mentor?.data()?.level}
            </Text>
          </View>
          <View style={tw`flex-row items-center justify-around mx-8 mt-5`}>
            <View style={tw`items-center`}>
              <Text style={tw`font-qs-bold text-2xl mb-2 text-${theme.text}`}>
                {formatNumber(courseMentor?.docs?.length)}
              </Text>
              <Text style={tw`font-qs-medium text-${theme.text}`}>
                Khóa học
              </Text>
            </View>
            <View style={tw`w-[1px] h-full bg-gray-border`} />
            <View style={tw`items-center`}>
              <Text style={tw`font-qs-bold text-2xl mb-2 text-${theme.text}`}>
                {formatNumber(classMentor?.docs?.length)}
              </Text>
              <Text style={tw`font-qs-medium text-${theme.text}`}>
                Học sinh
              </Text>
            </View>
          </View>
          <View style={tw`flex-1 mt-3`}>
            <MyTabBar mentorId={dataId} />
          </View>
        </View>
      </Container>
    );
  }
}

export default DetailMentor;
