import { useNavigation } from '@react-navigation/native';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import MyImage from '~/components/MyImage';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function MentorItem({ id }) {
  const ref = doc(collection(db, 'mentors'), id?.toString());
  const { data, isLoading } = useFirestoreDocument(['mentor', id], ref);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const goToDetailMentor = () => {
    navigation.navigate('DetailMentor', {
      dataId: id,
    });
  };

  if (isLoading) {
    return <MyLoading />;
  } else {
    return (
      <TouchableOpacity>
        <View style={tw`flex-row px-5 items-center `}>
          <TouchableOpacity
            onPress={() => goToDetailMentor()}
            style={tw`flex-row flex-1 items-center`}>
            <MyImage
              src={{
                uri: data?.data()?.avatar,
              }}
              style={tw`h-14 w-14 rounded-full`}
            />
            <View style={tw`ml-5`}>
              <Text style={tw`font-qs-bold text-base text-${theme.text}`}>
                {data?.data()?.mentorName}
              </Text>
              <Text
                numberOfLines={2}
                style={tw`font-qs-medium text-${theme.text}`}>
                {data?.data()?.level}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

export default MentorItem;
