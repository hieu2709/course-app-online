import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import ButtonBack from '~/components/ButtonBack';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import Header from '~/layouts/Header';
import TabBarCourse from '~/components/Course/TabBarCourse';

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
            Bookmark
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

      <TabBarCourse scrollEnabled={true} />
    </Container>
  );
}

export default BookMark;
