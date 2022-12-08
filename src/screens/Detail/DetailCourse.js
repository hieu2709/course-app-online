import React from 'react';
import { useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import MyButton from '~/components/MyButton';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import BottomModal from '~/modals/BottomModal';
import ItemCourse from '../../components/Course/ItemCourse';
import MyTabBar from './layouts/Course/MyTabBar';

import Header from './layouts/Course/Header';
import ButtonEnrolCourse from '~/components/ButtonEnrollCourse';

function DetailCourse({ navigation, route }) {
  const { data } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  const modalRef = useRef();
  const handleBookmark = () => {
    if (data.isBookMark) {
      modalRef?.current?.open();
    }
  };
  const handleCloseModal = () => {
    modalRef?.current?.close();
  };
  return (
    <Container>
      <View style={tw`flex-1`}>
        <View style={[tw`flex-1`]}>
          <Header
            data={data}
            handleBookmark={handleBookmark}
            scrollY={scrollY}
          />
          <View
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            style={tw`flex-1`}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false },
            )}>
            <MyTabBar />
          </View>
        </View>
        <ButtonEnrolCourse />
      </View>

      <BottomModal ref={modalRef}>
        <View style={tw`pb-10 rounded-t-3xl bg-${theme.bg}`}>
          <View style={tw`py-5 items-center mx-5 border-b-[0.2px] border-gray`}>
            <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
              Remove from Bookmark?
            </Text>
          </View>
          <ItemCourse item={data} canPress={false} />
          <View
            style={tw`flex-row items-center h-16 mt-6 overflow-hidden px-5`}>
            <MyButton
              title={'Cancel'}
              style={tw`flex-1 h-14 bg-blueSoft mr-2`}
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
    </Container>
  );
}

export default DetailCourse;
