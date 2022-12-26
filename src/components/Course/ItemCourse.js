import { useNavigation } from '@react-navigation/native';
import {
  useFirestoreDocument,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import React from 'react';
import { useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import MyToast from '~/base/components/MyToast';
import Icon from '~/base/Icon';
import MyButton from '~/components/MyButton';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';
import BottomModal from '~/modals/BottomModal';
import { formatNumber } from '~/utils';
import MyImage from '../MyImage';
import CategoryCourse from './CategoryCourse';

function ItemCourse({ courseId, canPress = true }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const modalRef = useRef();
  const { user } = useUser();
  const toastRef = useRef();
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
  const reviewRef = query(
    collection(db, 'myreview'),
    where('courseId', '==', courseId),
  );
  const { data: reviews, isLoading: isLoadingReview } = useFirestoreQuery(
    ['review', courseId],
    reviewRef,
    { subscribe: true },
  );
  const avgRate =
    reviews?.docs?.reduce((total, current) => {
      return total + current?.data()?.rate;
    }, 0) / reviews?.docs?.length || false;
  const getColor = () => {
    if (avgRate > 4) {
      return 'yellow';
    } else if (avgRate > 3) {
      return 'green';
    } else {
      return 'red';
    }
  };
  const myCourseRef = query(
    collection(db, 'mycourse'),
    // where('userId', '==', user?.userId || ''),
    where('courseId', '==', courseId),
    where('status', '!=', 0),
  );
  const { data: listMyCourse, isLoading: isLoadingListMyCourse } =
    useFirestoreQuery(['mycourse-enroll', courseId], myCourseRef, {
      subscribe: true,
    });
  // listMyCourse?.docs?.forEach(d => console.log(d.data()));
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
        toastRef?.current?.open(true, 'Đã đánh dấu khóa học này!');
      }
    } else {
      const params = {
        userId: user.userId,
        courseId,
        isBookmark: true,
        status: 0,
      };
      mutationCourse.mutate(params);
      toastRef?.current?.open(true, 'Đã đánh dấu khóa học này!');
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
    toastRef?.current?.open(false, 'Đã bỏ đánh dấu khóa học này!');
  };
  const onPress = () => {
    if (canPress) {
      navigation.navigate('DetailCourse', {
        dataId: courseId,
      });
    }
  };
  if (isLoading || isLoadingListMyCourse || isLoadingReview) {
    return <MyLoading text={'Loading'} />;
  } else {
    return (
      <TouchableOpacity
        disabled={!canPress}
        onPress={() => onPress()}
        style={tw`flex-row mx-5 bg-${theme.bgInput} p-5 rounded-3xl shadow-lg mt-5`}>
        <MyToast ref={toastRef} />
        <MyImage
          style={tw`w-30 h-30 rounded-xl`}
          src={{ uri: course?.data()?.image }}
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
            <Text style={tw`font-qs-semibold ml-2 text-${theme.text}`}>
              {formatNumber(listMyCourse?.docs?.length)} học sinh
            </Text>
            {avgRate && (
              <View style={tw`flex-row items-center `}>
                <Text style={tw`font-qs-bold ml-1 text-${theme.text}`}>
                  {' '}
                  |{' '}
                </Text>
                <View
                  style={tw`flex-row items-center px-2 bg-${getColor()} rounded-full`}>
                  <Text style={tw`font-qs-bold mr-1 text-base text-white`}>
                    {avgRate.toFixed(1)}
                  </Text>
                  <Icon
                    type="AntDesign"
                    name="star"
                    size={18}
                    color={tw.color('white')}
                  />
                </View>
              </View>
            )}
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
