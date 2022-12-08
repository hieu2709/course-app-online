import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import MyButton from '~/components/MyButton';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import BottomModal from '~/modals/BottomModal';
import { formatNumber } from '~/utils';

function ItemCourse({ item, canPress = true }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const modalRef = useRef();
  const [categoryName, setCategoryName] = useState('');
  const getCategoryName = useCallback(async () => {
    const q = query(
      collection(db, 'category'),
      where('categoryID', '==', item.categoryId),
    );
    const querySnap = await getDocs(q);
    querySnap.forEach(d => setCategoryName(d.data().categoryName));
  }, [item.categoryId]);
  useEffect(() => {
    getCategoryName();
  }, [getCategoryName]);
  const handleBookmark = () => {
    if (item.isBookMark) {
      modalRef?.current?.open();
    }
  };
  const handleCloseModal = () => {
    modalRef?.current?.close();
  };
  const onPress = () => {
    if (canPress) {
      navigation.navigate('DetailCourse', {
        data: item,
        categoryName,
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
              {categoryName}
            </Text>
          </View>
          <TouchableOpacity disabled={!canPress} onPress={handleBookmark}>
            {item.isBookMark ? (
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
              ${item.price}
            </Text>
          </View>
        ) : (
          <Text style={tw`font-qs-bold text-xl text-blue`}>${item.price}</Text>
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
              onPress={handleCloseModal}
            />
          </View>
        </View>
      </BottomModal>
    </TouchableOpacity>
  );
}

export default ItemCourse;
