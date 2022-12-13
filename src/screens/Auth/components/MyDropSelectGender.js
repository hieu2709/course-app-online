import React from 'react';
import { View } from 'react-native';
import MyDropSelect from '~/components/MyDropSelect';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
const listGender = [
  {
    key: 1,
    name: 'Nam',
  },
  {
    key: 2,
    name: 'Nữ',
  },
];
function MyDropSelectGender({ value, onChange }) {
  // console.log('value', value);
  const { theme } = useTheme();
  return (
    <View style={tw`w-full`}>
      <MyDropSelect
        selectStyle={tw`bg-${theme.bgInput} h-14 rounded-xl`}
        value={value}
        onChange={item => onChange(item)}
        list={listGender}
        dropStyle={tw`rounded-xl`}
      />
    </View>
  );
}

export default MyDropSelectGender;
