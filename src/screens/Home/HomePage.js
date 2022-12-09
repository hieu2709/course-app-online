import React from 'react';
import { useRef } from 'react';
import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import { formatNumber } from '~/utils';
import MostPopularCourse from './layouts/MostPopularCourse';
import TopMentor from './layouts/TopMentors';

function HomePage({ navigation }) {
  const { theme } = useTheme();
  const { user } = useUser();
  return (
    <Container>
      <View style={[tw`flex-1`]}>
        <View>
          <View style={tw`flex-row justify-between items-center px-5 py-5`}>
            <View style={tw`flex-row items-center`}>
              <Image
                source={require('~/assets/noavatar.png')}
                style={tw`w-15 h-15 rounded-full`}
              />
              <View style={tw`ml-4`}>
                <View style={tw`flex-row`}>
                  <Text style={tw`font-qs-regular text-lg text-gray mr-1`}>
                    Hello
                  </Text>
                  <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
                    {user?.fullname}
                  </Text>
                </View>
                <View style={tw`flex-row items-center`}>
                  <Icon
                    name={'coins'}
                    type="FontAwesome5"
                    size={20}
                    color={tw.color('yellow')}
                  />
                  <Text style={tw`font-qs-semibold text-lg text-yellow ml-2`}>
                    {formatNumber(user?.coins)} đ
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            style={[
              tw`h-[50px] mx-5 rounded-xl bg-${theme.bgInput} flex-row items-center px-6 shadow-md `,
            ]}>
            <Icon
              type="FontAweSome"
              name="search"
              size={18}
              color={tw.color('gray')}
            />
            <Text style={tw`font-qs-bold text-base text-gray ml-3`}>
              Search...
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`flex-1 pt-5`}>
          <View style={tw`flex-1`}>
            <TopMentor />
            <MostPopularCourse style={tw`mt-5`} />
          </View>
        </View>
      </View>
    </Container>
  );
}

export default HomePage;
