import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import ListCourseBookmark from './layouts/ListCourseBookmark';

function BookMark() {
  const { theme } = useTheme();
  return (
    <Container>
      <View style={tw`flex-row justify-between items-center mx-5 mb-3 mt-5`}>
        <View style={tw`flex-row items-center`}>
          <View
            style={tw`w-8 h-8 justify-center rounded-xl items-center bg-blue`}>
            <Image style={tw`w-4 h-4`} source={require('~/assets/logo.png')} />
          </View>
          <Text style={tw`ml-3 font-qs-bold text-xl text-${theme.text}`}>
            Khóa học đã đánh dấu
          </Text>
        </View>
        <TouchableOpacity>
          <Icon
            type="MaterialIcons"
            name="more-horiz"
            size={30}
            color={`${theme.text}`}
          />
        </TouchableOpacity>
      </View>
      <ListCourseBookmark />
    </Container>
  );
}

export default BookMark;
