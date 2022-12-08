import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

const listMentors = [
  {
    name: 'Jacob',
    avatar: 'https://nguoinoitieng.tv/images/thumbnail/101/bfoi.jpg',
  },
  {
    name: 'Claire',
    avatar: 'https://nguoinoitieng.tv/images/thumbnail/96/bbb4.jpg',
  },
  {
    name: 'Priscila',
    avatar: 'http://daihoc.fpt.edu.vn/media/2019/08/1-4.jpg',
  },
  {
    name: 'Wade',
    avatar: 'https://nguoinoitieng.tv/images/thumbnail/101/bfom.jpg',
  },
  {
    name: 'Kathry',
    avatar:
      'https://znews-photo.zingcdn.me/w660/Uploaded/neg_esfjaex/2020_10_14/121370560_204168327792450_1031573682667881920_n.jpg',
  },
];
function TopMentor() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  const getListMentor = async () => {};
  const goToDetailMentor = item => {
    navigation.navigate('DetailMentor', {
      data: item,
    });
  };
  return (
    <View>
      <View style={tw`flex-row items-center justify-between px-5 mb-5`}>
        <Text style={tw`font-qs-bold text-${theme.text} text-lg`}>
          Top Mentors
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('TopMentors')}>
          <Text style={tw`font-qs-bold text-blue text-base`}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {listMentors?.map((item, i) => (
          <TouchableOpacity
            onPress={() => goToDetailMentor(item)}
            style={tw`items-center ml-${i === 0 ? 5 : 0} mr-5`}
            key={i}>
            <Image
              style={tw`h-16 w-16 rounded-full`}
              source={{ uri: item.avatar }}
            />
            <Text style={tw`mt-2 font-qs-bold text-${theme.text}`}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default TopMentor;
