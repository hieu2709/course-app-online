import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '~/base/Icon';
import tw from '~/libs/tailwind';

function ButtonHeader({ style, rightIcon }) {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  return (
    <View
      style={[tw`mt-[${inset.top}px] mx-5 flex-row justify-between`, style]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          type="Entypo"
          name="chevron-left"
          size={30}
          color={tw.color('white')}
        />
      </TouchableOpacity>
      {rightIcon}
    </View>
  );
}

export default ButtonHeader;
