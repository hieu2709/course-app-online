import React from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '~/base/Icon';
import ButtonBack from '~/components/ButtonBack';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { formatNumber } from '~/utils';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useState } from 'react';
import { useCallback } from 'react';

const HEADER_MAX_HEIGHT = 180; // max header height
const HEADER_MIN_HEIGHT = 0; // min header height
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT; // header scrolling value

function Header({ data, handleBookmark }) {
  // console.log(scrollY);
  const theme = useTheme();
  return (
    <View>
      <View style={tw`flex-row justify-between items-start mx-5 mt-5`}>
        <View style={tw`flex-row items-start flex-1`}>
          <ButtonBack iconColor={tw.color('blue')} iconSize={30} />
          <Text style={tw`text-${theme.text} flex-1 font-qs-bold text-2xl`}>
            {data.courseName}
          </Text>
        </View>
        <TouchableOpacity style={tw`w-8`} onPress={handleBookmark}>
          {data.isBookMark ? (
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
      <View style={tw`flex-row mx-5 my-3`}>
        <View style={tw`bg-blueOpacity p-2 rounded-lg`}>
          <Text style={tw`font-qs-semibold text-xs text-blue`}>
            {data.categoryName}
          </Text>
        </View>
        <View style={tw`flex-row items-center ml-5`}>
          <Icon
            type="AntDesign"
            name="star"
            size={18}
            color={tw.color('yellow')}
          />
          <Text style={tw`font-qs-medium ml-2 text-${theme.text}`}>
            {data.rate} ({formatNumber(4390)} reviews)
          </Text>
        </View>
      </View>
      <View style={tw`mx-5`}>
        {data.priceSale ? (
          <View style={tw`flex-row items-center`}>
            <Text style={tw`font-qs-bold text-2xl text-blue mr-3`}>
              ${data.priceSale}
            </Text>
            <Text style={tw`font-qs-semibold text-base text-gray line-through`}>
              ${data.price}
            </Text>
          </View>
        ) : (
          <Text style={tw`font-qs-bold text-2xl text-blue`}>${data.price}</Text>
        )}
      </View>
      <View style={tw`flex-row items-center justify-between mx-5 py-2`}>
        <View style={tw`flex-row items-center`}>
          <Icon
            type="FontAwesome"
            name="group"
            size={14}
            color={tw.color('blue')}
          />
          <Text style={tw`font-qs-medium ml-1 text-${theme.text}`}>
            {formatNumber(data.students)} Students
          </Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <Icon
            type="AntDesign"
            name="clockcircle"
            size={14}
            color={tw.color('blue')}
          />
          <Text style={tw`font-qs-medium ml-1 text-${theme.text}`}>
            2,5 Hours
          </Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <Icon
            type="Entypo"
            name="text-document-inverted"
            size={18}
            color={tw.color('blue')}
          />
          <Text style={tw`font-qs-medium ml-1 text-${theme.text}`}>
            {formatNumber(data.students)} Certificate
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Header;
