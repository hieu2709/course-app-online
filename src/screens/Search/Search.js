import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '~/base/Icon';
import MyButton from '~/components/MyButton';
import MyTextInput from '~/components/MyTextInput';
import RadioGroup from '~/components/RadioGroup';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import tw from '~/libs/tailwind';
import BottomModal from '~/modals/BottomModal';
// import Search from '~/components/Search';

const category = [
  {
    name: 'All',
  },
  {
    name: '3D Design',
  },
  {
    name: 'Bussiness',
  },
  {
    name: 'Programming',
  },
];
const rateList = [
  {
    name: 'All',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '5',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '4',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '3',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '2',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
  {
    name: '1',
    icon: {
      type: 'AntDesign',
      name: 'star',
    },
  },
];
function Search({ navigation }) {
  const { theme } = useTheme();
  const [val, setValue] = useState('');
  const refFilter = useRef();
  // console.log(val);
  const handleCloseModal = () => {
    refFilter?.current?.close();
  };
  return (
    <Container>
      <TouchableNativeFeedback style={tw`flex-1`} onPress={Keyboard.dismiss}>
        <View style={tw`flex-1 bg-${theme.bg}`}>
          <Header title={'Search'} />
          <View style={tw`mx-5 shadow`}>
            <MyTextInput
              placeholder={'Search'}
              value={val}
              leftIcon={{
                type: 'Ionicons',
                name: 'ios-search-outline',
                size: 20,
              }}
              onChangeText={e => setValue(e)}
              rightIcon={{
                type: 'FontAwesome',
                name: 'sliders',
                size: 20,
                onPress: () => refFilter?.current?.open(),
              }}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
      <BottomModal ref={refFilter}>
        <View style={tw`pb-10 rounded-t-3xl bg-${theme.bg}`}>
          <View style={tw`py-5 items-center mx-5 border-b-[0.2px] border-gray`}>
            <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
              Filter?
            </Text>
          </View>
          <View style={tw`mt-5 border-b-[0.2px] border-gray`}>
            <Text style={tw`font-qs-bold text-base text-${theme.text} ml-5`}>
              Category
            </Text>
            <RadioGroup data={category} horzital={true} />
            <View style={tw`mb-2`}>
              <RadioGroup data={rateList} horzital={true} />
            </View>
          </View>
          <View
            style={tw`flex-row items-center h-16 mt-6 overflow-hidden px-5 `}>
            <MyButton
              title={'Reset'}
              style={tw`flex-1 h-14 bg-blueSoft mr-2`}
              titleColor={tw.color('blue')}
              // onPress={handleCloseModal}
            />
            <MyButton
              title={'Filter'}
              style={tw`flex-1 h-14 bg-blue ml-2`}
              titleColor={tw.color('white')}
              onPress={handleCloseModal}
            />
          </View>
        </View>
      </BottomModal>
    </Container>
  );
}
export default Search;
