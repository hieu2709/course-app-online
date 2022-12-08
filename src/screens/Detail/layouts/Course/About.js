import React from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '~/base/Icon';
import MyImage from '~/components/MyImage';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import ReadMore from '@fawazahmed/react-native-read-more';
import { useNavigation } from '@react-navigation/native';
const mentor = {
  name: 'Jonathan Wiliams',
  avatar:
    'https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A2nh-g%C3%A1i-d%E1%BB%85-th%C6%B0%C6%A1ng-l%C3%A0m-h%C3%ACnh-%C4%91%E1%BA%A1i-di%E1%BB%87n-xinh-x%E1%BA%AFn.jpg',
};

function About({ onScroll }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const goToDetailMentor = item => {
    navigation.navigate('DetailMentor', {
      data: item,
    });
  };
  return (
    <View style={tw`flex-1 `}>
      <ScrollView
        style={tw`flex-1`}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Text style={tw`font-qs-bold pt-5 pl-5 text-lg text-${theme.text}`}>
          Mentor
        </Text>
        <View style={tw`flex-row justify-between items-center px-5 pt-3`}>
          <TouchableOpacity
            onPress={() => goToDetailMentor(mentor)}
            style={tw`flex-row items-center `}>
            <MyImage
              src={{
                uri: mentor.avatar,
              }}
              style={tw`h-14 w-14 rounded-full`}
            />
            <View style={tw`ml-5`}>
              <Text style={tw`font-qs-bold text-base text-${theme.text}`}>
                {mentor.name}
              </Text>
              <Text
                numberOfLines={2}
                style={tw`font-qs-medium text-${theme.text}`}>
                Senior UI/UX Designer at Google
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity>
              <Icon
                type="AntDesign"
                name="message1"
                size={26}
                color={tw.color('blue')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`px-5 pt-5`}>
          <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
            About Course
          </Text>
          <ReadMore
            numberOfLines={15}
            seeMoreText="Read more"
            seeLessText="Read less"
            seeMoreStyle={tw`text-green font-qs-bold`}
            seeLessStyle={tw`text-red font-qs-bold`}
            style={tw`mt-5 pb-5 font-qs-medium text-sm text-${theme.text}`}>
            {
              'Last week we installed a kitty door so that our cat could come and go as she pleases. Unfortunately, we ran into a problem. Our cat was afraid to use the kitty door. We tried pushing her through, and that caused her to be even more afraid. The kitty door was dark, and she couldn’t see what was on the other side. The first step we took in solving this problem was taping the kitty door open. After a couple of days, she was confidently coming and going through the open door. However, when we removed the tape and closed the door, once again, she would not go through. They say you catch more bees with honey, so we decided to use food as bait. We would sit next to the kitty door with a can of wet food and click the top of the can. When kitty came through the closed door, we would open the can and feed her. It took five days of doing this to make her unafraid of using the kitty door. Now we have just one last problem: our kitty controls our lives! !'
            }
          </ReadMore>
        </View>
      </ScrollView>
    </View>
  );
}

export default About;
