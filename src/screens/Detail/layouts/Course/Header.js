import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import ButtonBack from '~/components/ButtonBack';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { convertMintoHrs, formatNumber } from '~/utils';
import useCourse from '~/hooks/useCourse';
import CategoryCourse from '~/components/Course/CategoryCourse';

function Header({ handleBookmark, isBookmark }) {
  const { theme } = useTheme();
  const { course, totalTime, review, rate, countStudent } = useCourse();
  const getColor = () => {
    if (rate > 4) {
      return 'yellow';
    } else if (rate > 3) {
      return 'green';
    } else {
      return 'red';
    }
  };
  return (
    <View>
      <View style={tw`flex-row justify-between items-start mx-5 mt-5`}>
        <View style={tw`flex-row items-start flex-1`}>
          <ButtonBack iconColor={tw.color('blue')} iconSize={30} />
          <Text style={tw`text-${theme.text} flex-1 font-qs-bold text-2xl`}>
            {course?.courseName}
          </Text>
        </View>
        <TouchableOpacity style={tw`w-8`} onPress={handleBookmark}>
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
      <View style={tw`flex-row mx-5 my-3`}>
        <CategoryCourse categoryId={course?.categoryId} />
        <View style={tw`flex-row items-center ml-5`}>
          <View
            style={tw`flex-row items-center bg-${getColor()} px-2 rounded-full`}>
            {rate && (
              <Text style={tw`font-qs-bold text-base mr-1 text-white`}>
                {rate?.toFixed(1) || 0}
              </Text>
            )}
            {rate && (
              <Icon
                type="AntDesign"
                name="star"
                size={18}
                color={tw.color('white')}
              />
            )}
          </View>
          <Text style={tw`font-qs-medium ml-2 text-${theme.text} text-base`}>
            ({formatNumber(review)} ????nh gi??)
          </Text>
        </View>
      </View>
      <View style={tw`mx-5`}>
        {course.priceSale ? (
          <View style={tw`flex-row items-center`}>
            <Text style={tw`font-qs-bold text-2xl text-blue mr-3`}>
              ${course.priceSale}
            </Text>
            <Text style={tw`font-qs-semibold text-base text-gray line-through`}>
              ${course.price}
            </Text>
          </View>
        ) : (
          <Text style={tw`font-qs-bold text-2xl text-blue`}>
            {formatNumber(course.price)} ??
          </Text>
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
            {formatNumber(countStudent || 0)} H???c sinh
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
            {convertMintoHrs(totalTime || 0)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Header;
