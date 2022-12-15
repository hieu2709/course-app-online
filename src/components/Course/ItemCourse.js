import { useNavigation } from '@react-navigation/native';
import {
  useFirestoreDocument,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  query,
  where,
} from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import Icon from '~/base/Icon';
import MyButton from '~/components/MyButton';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';
import BottomModal from '~/modals/BottomModal';
import { formatNumber } from '~/utils';
import CategoryCourse from './CategoryCourse';

function ItemCourse({ courseId, canPress = true }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const modalRef = useRef();
  const { user } = useUser();
  const docRef = doc(
    db,
    'mycourse',
    user?.userId?.toString() + courseId?.toString(),
  );
  const courseRef = doc(db, 'courses', courseId?.toString());
  const { data: course, isLoading } = useFirestoreDocument(
    ['course', courseId],
    courseRef,
  );
  const myCourseRef = query(
    collection(db, 'mycourse'),
    where('status', '!=', 0),
  );
  const { data: listMyCourse, isLoadingListMyCourse } = useFirestoreQuery(
    ['mycourse'],
    myCourseRef,
    { subscribe: true },
  );
  const { data: myCourse, refetch } = useFirestoreDocument(
    ['mycourse', user?.userId?.toString() + courseId?.toString()],
    docRef,
  );

  const mutationCourse = useFirestoreDocumentMutation(
    docRef,
    { merge: true },
    { onSettled: refetch },
  );
  const handleBookmark = async () => {
    const docsnap = await getDoc(docRef);
    if (docsnap.exists()) {
      if (docsnap.data().isBookmark) {
        modalRef?.current?.open();
      } else {
        const param = {
          ...myCourse?.data(),
          isBookmark: true,
        };
        mutationCourse.mutate(param);
      }
    } else {
      const params = {
        userId: user.userId,
        courseId,
        isBookmark: true,
        status: 0,
      };
      mutationCourse.mutate(params);
    }
  };
  const handleCloseModal = () => {
    modalRef?.current?.close();
  };
  const handleRemoveBookmark = () => {
    const param = {
      ...myCourse?.data(),
      isBookmark: false,
    };
    mutationCourse.mutate(param);
    modalRef?.current?.close();
  };
  const onPress = () => {
    if (canPress) {
      navigation.navigate('DetailCourse', {
        data: course?.data(),
      });
    }
  };
  if (isLoading) {
    return <MyLoading text={'Loading'} />;
  } else {
    return (
      <TouchableOpacity
        disabled={!canPress}
        onPress={() => onPress()}
        style={tw`flex-row mx-5 bg-${theme.bgInput} p-5 rounded-3xl shadow-lg mt-5 `}>
        <Image
          style={tw`w-30 h-30 rounded-xl`}
          source={{ uri: course?.data()?.image }}
        />
        <View style={tw`ml-5 flex-1`}>
          <View style={tw`flex-row  justify-between items-center`}>
            <CategoryCourse categoryId={course?.data()?.categoryId} />
            <TouchableOpacity disabled={!canPress} onPress={handleBookmark}>
              {myCourse?.data()?.isBookmark ? (
                <Icon
                  type="Ionicons"
                  name="ios-bookmark"
                  size={24}
                  color={tw.color('blue')}
                />
              ) : (
                <Icon
                  type="Ionicons"
                  name="ios-bookmark-outline"
                  size={24}
                  color={tw.color('blue')}
                />
              )}
            </TouchableOpacity>
          </View>
          <Text
            numberOfLines={1}
            style={tw`font-qs-bold text-lg mt-3 text-${theme.text}`}>
            {course?.data()?.courseName}
          </Text>

          {course?.data()?.priceSale ? (
            <View style={tw`flex-row items-center`}>
              <Text style={tw`font-qs-bold text-xl text-blue mr-3`}>
                ${course?.data()?.priceSale}
              </Text>
              <Text
                style={tw`font-qs-regular text-sm text-${theme.text} line-through`}>
                ${formatNumber(course?.data()?.price)}
              </Text>
            </View>
          ) : (
            <Text style={tw`font-qs-bold text-xl text-blue`}>
              {formatNumber(course?.data()?.price)} đ
            </Text>
          )}
          <View style={tw`flex-row items-center mt-1`}>
            <Icon
              type="AntDesign"
              name="star"
              size={18}
              color={tw.color('yellow')}
            />
            <Text style={tw`font-qs-medium ml-2 text-${theme.text}`}>
              {course?.data()?.rate} |{' '}
              {formatNumber(listMyCourse?.docs?.length)} học sinh
            </Text>
          </View>
        </View>
        <BottomModal ref={modalRef}>
          <View style={tw`pb-10 rounded-t-3xl bg-${theme.bg}`}>
            <View
              style={tw`py-5 items-center mx-5 border-b-[0.2px] border-gray`}>
              <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
                Bỏ đánh dấu khóa học này?
              </Text>
            </View>
            <ItemCourse courseId={courseId} canPress={false} />
            <View
              style={tw`flex-row items-center h-16 mt-6 overflow-hidden px-5`}>
              <MyButton
                title={'Hủy'}
                style={tw`flex-1 h-14 bg-blueOpacity mr-2`}
                titleColor={tw.color('blue')}
                onPress={handleCloseModal}
              />
              <MyButton
                title={'Bỏ đánh dấu'}
                style={tw`flex-1 h-14 bg-blue ml-2`}
                titleColor={tw.color('white')}
                onPress={handleRemoveBookmark}
              />
            </View>
          </View>
        </BottomModal>
      </TouchableOpacity>
    );
  }
}

export default ItemCourse;
