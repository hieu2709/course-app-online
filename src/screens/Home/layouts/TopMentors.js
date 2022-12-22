import { useNavigation } from '@react-navigation/native';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, limit, query } from 'firebase/firestore';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import MyImage from '~/components/MyImage';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function TopMentor() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const mentorRef = collection(db, 'mentors');
  const ref = query(mentorRef, limit(2));
  const { data, isLoading } = useFirestoreQuery(['mentors-limit'], ref);
  const goToDetailMentor = id => {
    navigation.navigate('DetailMentor', {
      dataId: id,
    });
  };
  if (isLoading) {
    return <MyLoading text={'Đang tải...'} />;
  } else {
    return (
      <View>
        <View style={tw`flex-row items-center justify-between px-5 mb-1`}>
          <Text style={tw`font-qs-bold text-${theme.text} text-base`}>
            Giáo viên nổi bật
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllMentor')}>
            <Text style={tw`font-qs-bold text-blue text-base`}>Tất cả</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.docs?.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => goToDetailMentor(item.data()?.mentorID)}
                style={tw`items-center ml-${i === 0 ? 5 : 0} mr-5`}
                key={i}>
                <MyImage
                  style={tw`h-12 w-12 rounded-full`}
                  src={{ uri: item.data().avatar }}
                />
                <Text style={tw`mt-1 font-qs-bold text-${theme.text}`}>
                  {item.data().mentorName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {/* <View style={tw`h-25`} /> */}
      </View>
    );
  }
}

export default TopMentor;
