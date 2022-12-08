import ReadMore from '@fawazahmed/react-native-read-more';
import React from 'react';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import MyImage from '~/components/MyImage';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { formatNumber } from '~/utils';

function ItemReview({ item }) {
  const theme = useTheme();
  const [isLike, setIsLike] = useState(false);
  const handleLike = () => {
    setIsLike(!isLike);
  };
  return (
    <View style={tw`px-5 py-2 mb-3 bg-${theme.bg} shadow `}>
      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
          <MyImage style={tw`h-12 w-12 rounded-full`} />
          <Text style={tw`font-qs-bold ml-5 text-base`}>Marielle Wiginton</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <View
            style={tw`flex-row border-2 border-blue px-3 py-[0.5px] rounded-full items-center`}>
            <Icon
              type="AntDesign"
              name="star"
              size={16}
              color={tw.color('blue')}
            />
            <Text style={tw`ml-1 font-qs-bold text-base text-blue`}>5</Text>
          </View>
          <View
            style={tw`h-6 w-6 justify-center items-center rounded-full border-2 border-${theme.text} ml-3`}>
            <Icon
              type="MaterialIcons"
              name="more-horiz"
              size={16}
              color={theme.text}
            />
          </View>
        </View>
      </View>
      <ReadMore
        numberOfLines={2}
        style={tw`mt-2 font-qs-medium text-${theme.text} mb-1`}>
        {
          'Last week we installed a kitty door so that our cat could come and go as she pleases. Unfortunately, we ran into a problem. Our cat was afraid to use the kitty door.'
        }
      </ReadMore>
      <View style={tw`flex-row py-2`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity onPress={handleLike}>
            {isLike ? (
              <Icon
                type="Octicons"
                name="heart-fill"
                size={20}
                color={tw.color('red')}
              />
            ) : (
              <Icon
                type="Octicons"
                name="heart"
                size={20}
                color={tw.color(theme.text)}
              />
            )}
          </TouchableOpacity>
          <Text style={tw`font-qs-semibold ml-2 text-${theme.text}`}>
            {formatNumber(948)}
          </Text>
          <Text style={tw`font-qs-medium text-${theme.text} ml-5`}>
            3 weeks ago
          </Text>
        </View>
      </View>
    </View>
  );
}

export default ItemReview;
