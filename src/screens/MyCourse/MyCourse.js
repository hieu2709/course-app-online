import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import MyTabView from './layouts/MyTabView';

function MyCourse() {
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
            My Courses
          </Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity>
            <Icon
              type="AntDesign"
              name="search1"
              size={26}
              color={theme.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`h-6 w-6 ml-5 justify-center items-center rounded-full border-[1.5px] border-${theme.text}`}>
            <Icon
              type="MaterialIcons"
              name="more-horiz"
              size={16}
              color={theme.text}
            />
          </TouchableOpacity>
        </View>
      </View>
      <MyTabView />
    </Container>
  );
}

export default MyCourse;
