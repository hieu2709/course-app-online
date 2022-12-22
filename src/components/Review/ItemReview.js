import ReadMore from '@fawazahmed/react-native-read-more';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import React from 'react';
import { Text, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import Icon from '~/base/Icon';
import MyImage from '~/components/MyImage';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function ItemReview({ review }) {
  const { theme } = useTheme();
  const userRef = doc(collection(db, 'users'), review?.userId?.toString());
  const { data: user, isLoading: isLoadingUser } = useFirestoreDocument(
    ['user', review?.userId],
    userRef,
  );
  // console.log(review);
  if (isLoadingUser) {
    return <MyLoading />;
  } else {
    return (
      <View style={tw`px-5 py-3 shadow `}>
        <View style={tw`flex-row items-start`}>
          <MyImage style={tw`h-7 w-7 rounded-full`} />
          <View style={tw`flex-1 ml-5 `}>
            <View style={tw`flex-row items-center justify-between  flex-1`}>
              <Text style={tw`font-qs-bold text-base `}>
                {user?.data()?.fullname}
              </Text>
              <View style={tw`flex-row items-center`}>
                <View
                  style={tw`flex-row border-2 border-blue px-3 py-[0.5px] rounded-full items-center`}>
                  <Icon
                    type="AntDesign"
                    name="star"
                    size={16}
                    color={tw.color('blue')}
                  />
                  <Text style={tw`ml-1 font-qs-bold text-base text-blue`}>
                    {review?.rate}
                  </Text>
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
              style={tw`mt-1 font-qs-medium text-${theme.text}`}>
              {review?.review || ''}
            </ReadMore>
          </View>
        </View>
      </View>
    );
  }
}

export default ItemReview;
