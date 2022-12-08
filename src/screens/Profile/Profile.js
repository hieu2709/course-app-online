import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import Icon from '~/base/Icon';
import MyImage from '~/components/MyImage';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import RowSection from './components/RowSection';

function Profile() {
  const theme = useTheme();
  return (
    <Container>
      <View style={tw`flex-row justify-between items-center mx-5 mb-3 mt-5`}>
        <View style={tw`flex-row items-center`}>
          <View
            style={tw`w-8 h-8 justify-center rounded-xl items-center bg-blue`}>
            <Image style={tw`w-4 h-4`} source={require('~/assets/logo.png')} />
          </View>
          <Text style={tw`ml-3 font-qs-bold text-xl text-${theme.text}`}>
            Profile
          </Text>
        </View>
        <TouchableOpacity
          style={tw`h-6 w-6 justify-center items-center rounded-full border-[1.5px] border-${theme.text}`}>
          <Icon
            type="MaterialIcons"
            name="more-horiz"
            size={16}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>
      <View style={tw`items-center pb-5 border-b border-gray-border mx-5`}>
        <MyImage
          src={{
            uri: 'https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A2nh-hot-girl-l%C3%A0m-avt.jpg',
          }}
          style={tw`w-22 h-22 rounded-full mt-5`}
        />
        <Text style={tw`font-qs-bold mt-3 text-xl text-${theme.text}`}>
          Andrew Ainsley
        </Text>
        {false && (
          <Text style={tw`text-${theme.text} font-qs-semibold mt-2`}>
            andrew_ainsley@yourdomain.com
          </Text>
        )}
      </View>
      <View style={tw`pt-2.5`}>
        <RowSection
          icon={
            <Icon type="AntDesign" name="user" size={22} color={theme.text} />
          }
          title={'Edit Profile'}
        />
        <RowSection
          icon={
            <Icon
              type="FontAwesome"
              name="language"
              size={22}
              color={theme.text}
            />
          }
          title={'Language'}
        />
        <TouchableOpacity
          style={tw`flex-row justify-between items-center mx-5 py-2.5 border-b-[0.2px] border-gray-border`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`w-10 justify-center`}>
              <Icon
                type="FontAwesome"
                name="moon-o"
                size={22}
                color={theme.text}
              />
            </View>
            <Text style={tw`font-qs-semibold text-base text-${theme.text}`}>
              Dark mode
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row justify-between items-center mx-5 py-2.5 `}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`w-10 justify-center`}>
              <Icon
                type="AntDesign"
                name="logout"
                size={22}
                color={tw.color('red')}
              />
            </View>
            <Text style={tw`font-qs-bold text-base text-red`}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

export default Profile;
