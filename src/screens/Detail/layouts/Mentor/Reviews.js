import React from 'react';
import { ScrollView, View } from 'react-native';
import ItemReview from '~/components/Review/ItemReview';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
function Reviews() {
  const { theme } = useTheme();
  return (
    <View style={tw`flex-1`}>
      <ScrollView
        contentContainerStyle={tw`pt-5 pb-10`}
        showsVerticalScrollIndicator={false}>
        <ItemReview />
        <ItemReview />
        <ItemReview />
        <ItemReview />
        <ItemReview />
        <ItemReview />
      </ScrollView>
    </View>
  );
}

export default Reviews;
