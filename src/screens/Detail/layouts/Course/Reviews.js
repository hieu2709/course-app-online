import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import RadioGroup from '~/components/RadioGroup';
import ItemReview from '~/components/Review/ItemReview';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { formatNumber } from '~/utils';
const rateList = [
  {
    name: 'All',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '5',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '4',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '3',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '2',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '1',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
];

function Reviews() {
  const { theme } = useTheme();
  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1`}>
        <View style={tw`flex-row items-center justify-between px-5 mt-5 mb-2`}>
          <View style={tw`flex-row items-center`}>
            <Icon
              type="AntDesign"
              name="star"
              size={26}
              color={tw.color('yellow')}
            />
            <Text style={tw`font-qs-bold text-lg ml-3 text-${theme.text}`}>
              4.8 ({formatNumber(4478)} reviews)
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={tw`font-qs-bold text-base text-blue`}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`mb-2`}>
          <RadioGroup data={rateList} horzital={true} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ItemReview />
          <ItemReview />
          <ItemReview />
          <ItemReview />
          <ItemReview />
          <ItemReview />
        </ScrollView>
      </View>
    </View>
  );
}

export default Reviews;
