import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import MyButton from '~/components/MyButton';
import MyImage from '~/components/MyImage';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import tw from '~/libs/tailwind';
import { formatNumber } from '~/utils';
import MyTabBar from './layouts/Mentor/MyTabBar';

function DetailMentor({ navigation, route }) {
  const { data } = route.params || null;
  const { theme } = useTheme();
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
            src={{ uri: data?.avatar }}
            style={tw`h-24 w-24 rounded-full`}
          />
          <Text style={tw`mt-3 text-2xl font-qs-bold text-${theme.text}`}>
            {data?.name}
          </Text>
          <Text
            style={tw`mt-2 text-base font-qs-semibold mx-14 text-center text-${theme.text}`}>
            Senior UI/UX Designer at Google
          </Text>
        </View>
        <View style={tw`flex-row items-center justify-around mx-8 mt-5`}>
          <View style={tw`items-center`}>
            <Text style={tw`font-qs-bold text-2xl mb-2 text-${theme.text}`}>
              {formatNumber(25)}
            </Text>
            <Text style={tw`font-qs-medium text-${theme.text}`}>Courses</Text>
          </View>
          <View style={tw`w-[1px] h-full bg-gray-border`} />
          <View style={tw`items-center`}>
            <Text style={tw`font-qs-bold text-2xl mb-2 text-${theme.text}`}>
              {formatNumber(22397)}
            </Text>
            <Text style={tw`font-qs-medium text-${theme.text}`}>Students</Text>
          </View>
          <View style={tw`w-[1px] h-full bg-gray-border`} />
          <View style={tw`items-center`}>
            <Text style={tw`font-qs-bold text-2xl mb-2 text-${theme.text}`}>
              {formatNumber(9273)}
            </Text>
            <Text style={tw`font-qs-medium text-${theme.text}`}>Reviews</Text>
          </View>
        </View>
        <View style={tw`flex-row mx-5 mt-5 `}>
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
        </View>
        <View style={tw`flex-1 mt-3`}>
          <MyTabBar />
        </View>
      </View>
    </Container>
  );
}

export default DetailMentor;
