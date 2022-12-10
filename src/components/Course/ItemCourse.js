import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  useFirestoreDocument,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import MyButton from '~/components/MyButton';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';
import BottomModal from '~/modals/BottomModal';
import { formatNumber } from '~/utils';
import { useRefreshOnFocus } from '~/utils/hooks';

function ItemCourse({ item, canPress = true }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const modalRef = useRef();
  const { user } = useUser();
  const isFocused = useIsFocused();
  const [isBookmark, setIsBookmark] = useState(false);
  const categoryRef = doc(
    collection(db, 'category'),
    item?.categoryId?.toString(),
  );
  const { data: category } = useFirestoreDocument(
    ['category', item?.categoryId],
    categoryRef,
  );
  const docRef = doc(
    db,
    'mycourse',
    user?.userId?.toString() + item.courseID.toString(),
  );
  const { data: myCourse, refetch } = useFirestoreDocument(
    ['mycourse', user?.userId?.toString() + item.courseID.toString()],
    docRef,
  );
  useEffect(() => {
    if (myCourse?.exists()) {
      setIsBookmark(myCourse?.data()?.isBookmark);
    }
  }, [myCourse]);
  useEffect(() => {
    console.log(1);
  }, [isFocused]);
  const mutationCourse = useFirestoreDocumentMutation(docRef, { merge: true });
  const handleBookmark = async () => {
    const docsnap = await getDoc(docRef);
    if (docsnap.exists()) {
      if (docsnap.data().isBookmark) {
        modalRef?.current?.open();
      } else {
        setDoc(docRef, { isBookmark: true }, { merge: true });
        // const params = {
        //   ...myCourse?.data(),
        //   isBookmark: true,
        // };
        mutationCourse.mutate({ isBookmark: true });
        setIsBookmark(true);
        // setMyCourse(params);
      }
    } else {
      const params = {
        userId: user.userId,
        courseId: item.courseID,
        isBookmark: true,
        status: 0,
      };
      setDoc(docRef, params);
      mutationCourse.mutate(params);
      setIsBookmark(true);
      // setMyCourse(params);
    }
  };
  const handleCloseModal = () => {
    modalRef?.current?.close();
  };
  const handleRemoveBookmark = () => {
    setDoc(docRef, { isBookmark: false }, { merge: true });
    // const params = {
    //   ...myCourse,
    //   isBookmark: false,
    // };
    mutationCourse.mutate({ isBookmark: false });
    setIsBookmark(false);
    // setMyCourse(params);
    modalRef?.current?.close();
  };
  const onPress = () => {
    if (canPress) {
      navigation.navigate('DetailCourse', {
        data: item,
        categoryName: category?.data()?.categoryName,
      });
    }
  };

  return (
    <TouchableOpacity
      disabled={!canPress}
      onPress={() => onPress()}
      style={tw`flex-row mx-5 bg-${theme.bgInput} p-5 rounded-3xl shadow-lg mt-5 `}>
      <Image style={tw`w-30 h-30 rounded-xl`} source={{ uri: item.image }} />
      <View style={tw`ml-5 flex-1`}>
        <View style={tw`flex-row  justify-between items-center`}>
          <View style={tw`bg-blueOpacity p-2 rounded-lg`}>
            <Text style={tw`font-qs-semibold text-xs text-blue`}>
              {category?.data()?.categoryName}
            </Text>
          </View>
          <TouchableOpacity disabled={!canPress} onPress={handleBookmark}>
            {isBookmark ? (
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
          {item.courseName}
        </Text>

        {item.priceSale ? (
          <View style={tw`flex-row items-center`}>
            <Text style={tw`font-qs-bold text-xl text-blue mr-3`}>
              ${item.priceSale}
            </Text>
            <Text
              style={tw`font-qs-regular text-sm text-${theme.text} line-through`}>
              ${formatNumber(item.price)}
            </Text>
          </View>
        ) : (
          <Text style={tw`font-qs-bold text-xl text-blue`}>
            {formatNumber(item.price)} đ
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
            {item.rate} | {formatNumber(item.students)} students
          </Text>
        </View>
      </View>
      <BottomModal ref={modalRef}>
        <View style={tw`pb-10 rounded-t-3xl bg-${theme.bg}`}>
          <View style={tw`py-5 items-center mx-5 border-b-[0.2px] border-gray`}>
            <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
              Remove from Bookmark?
            </Text>
          </View>
          <ItemCourse item={item} canPress={false} />
          <View
            style={tw`flex-row items-center h-16 mt-6 overflow-hidden px-5`}>
            <MyButton
              title={'Cancel'}
              style={tw`flex-1 h-14 bg-blueOpacity mr-2`}
              titleColor={tw.color('blue')}
              onPress={handleCloseModal}
            />
            <MyButton
              title={'Yes, Remove'}
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

export default ItemCourse;
