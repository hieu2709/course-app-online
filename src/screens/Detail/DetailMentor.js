import { useFirestoreDocument } from '@react-query-firebase/firestore';
import {
  collection,
  doc,
  getCountFromServer,
  query,
  where,
} from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
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
  const [countCourse, setCountCourse] = useState(0);
  const [countStudent, setCountStudent] = useState(0);
  const collectionRef = collection(db, 'mentors');
  const ref = doc(collectionRef, dataId?.toString());
  const { data: mentor, isLoading } = useFirestoreDocument(
    ['mentor', dataId],
    ref,
  );

  useEffect(() => {
    const getCountCourse = async () => {
      const courseRef = query(
        collection(db, 'courses'),
        where('mentorID', '==', dataId),
      );
      const snapshot = await getCountFromServer(courseRef);
      setCountCourse(snapshot.data().count);
    };
    const getCountStudent = async () => {
      const courseRef = query(
        collection(db, 'class'),
        where('mentorID', '==', dataId),
      );
      const snapshot = await getCountFromServer(courseRef);
      setCountStudent(snapshot.data().count);
    };
    getCountCourse();
    getCountStudent();
  }, [dataId]);
  if (isLoading) {
    return <MyLoadingFull text={'Đang tải dữ liệu...'} />;
  } else {
    return (
      <Container>
        <Header
          rightIcon={
            <TouchableOpacity
              style={tw`h-6 w-6 justify-center items-center rounded-full border-[1.5px] border-${theme.text}`}>
              <Icon
                type="MaterialIcons"
                name="more-horiz"
                size={14}
                color={theme.text}
              />
            </TouchableOpacity>
          }
        />
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
                {formatNumber(countCourse)}
              </Text>
              <Text style={tw`font-qs-medium text-${theme.text}`}>
                Khóa học
              </Text>
            </View>
            <View style={tw`w-[1px] h-full bg-gray-border`} />
            <View style={tw`items-center`}>
              <Text style={tw`font-qs-bold text-2xl mb-2 text-${theme.text}`}>
                {formatNumber(countStudent)}
              </Text>
              <Text style={tw`font-qs-medium text-${theme.text}`}>
                Học sinh
              </Text>
            </View>
            <View style={tw`w-[1px] h-full bg-gray-border`} />
            <View style={tw`items-center`}>
              <Text style={tw`font-qs-bold text-2xl mb-2 text-${theme.text}`}>
                {formatNumber(9273)}
              </Text>
              <Text style={tw`font-qs-medium text-${theme.text}`}>
                Đánh giá
              </Text>
            </View>
          </View>
          {/* <View style={tw`flex-row mx-5 mt-5 `}>
            <MyButton
              style={tw`h-12 mr-2 flex-1 `}
              leftIcon={
                <Icon
                  type="MaterialCommunityIcons"
                  name="message-processing"
                  size={20}
                  color={tw.color('white')}
                />
              }
              title={'Message'}
            />
            <MyButton
              style={tw`h-12 ml-2 flex-1 bg-${theme.bg} border-2 border-blue`}
              leftIcon={
                <Icon
                  type="FontAwesome5"
                  name="safari"
                  size={20}
                  color={tw.color('blue')}
                />
              }
              title={'Website'}
              titleColor={tw.color('blue')}
            />
          </View> */}
          <View style={tw`flex-1 mt-3`}>
            <MyTabBar mentorId={dataId} />
          </View>
        </View>
      </Container>
    );
  }
}

export default DetailMentor;
