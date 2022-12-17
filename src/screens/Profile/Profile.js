import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import Icon from '~/base/Icon';
import MyImage from '~/components/MyImage';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import { formatNumber } from '~/utils';
import RowSection from './components/RowSection';

function Profile({ navigation }) {
  const { theme } = useTheme();
  const { user, setUser } = useUser();
  const clearStorage = async key => {
    await AsyncStorage.removeItem(key);
  };
  const logout = async () => {
    await clearStorage('user');
    setUser(false);
  };
  return (
    <Container>
      <View style={tw`flex-row justify-between items-center mx-5 mb-3 mt-5`}>
        <View style={tw`flex-row items-center`}>
          <View
            style={tw`w-8 h-8 justify-center rounded-xl items-center bg-blue`}>
            <Image style={tw`w-4 h-4`} source={require('~/assets/logo.png')} />
          </View>
          <Text style={tw`ml-3 font-qs-bold text-xl text-${theme.text}`}>
            Hồ sơ cá nhân
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
          {user?.fullname}
        </Text>
        <View style={tw`flex-row items-center  mt-1 `}>
          <Icon
            type="FontAwesome5"
            name="coins"
            size={16}
            color={tw.color('yellow')}
          />
          <Text style={tw`font-qs-semibold ml-3 text-xl text-yellow`}>
            {formatNumber(user?.coins)} đ
          </Text>
        </View>
      </View>
      <View style={tw`pt-2.5`}>
        <RowSection
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          icon={
            <Icon type="AntDesign" name="user" size={22} color={theme.text} />
          }
          title={'Sửa thông tin cá nhân'}
        />
        <RowSection
          onPress={() => {
            navigation.navigate('Transaction');
          }}
          icon={
            <Icon
              type="FontAwesome5"
              name="coins"
              size={22}
              color={theme.text}
            />
          }
          title={'Nạp tiền'}
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
          title={'Ngôn ngữ'}
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
              Chế độ tối
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row justify-between items-center mx-5 py-2.5 `}
          onPress={logout}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`w-10 justify-center`}>
              <Icon
                type="AntDesign"
                name="logout"
                size={22}
                color={tw.color('red')}
              />
            </View>
            <Text style={tw`font-qs-bold text-base text-red`}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

export default Profile;
