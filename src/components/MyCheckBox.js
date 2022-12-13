import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import Icon from '~/base/Icon';
import tw from '~/libs/tailwind';

function MyCheckBox({}, ref) {
  const [isCheck, setIsCheck] = useState(false);
  useImperativeHandle(ref, () => ({
    onPress: () => setIsCheck(!isCheck),
  }));
  return (
    <View
      style={tw`h-5.5 w-5.5 bg-${
        isCheck ? 'blue' : 'transparent'
      } border-[3px] rounded-md border-blue justify-center items-center`}>
      {isCheck && (
        <Icon
          type={'FontAwesome5'}
          name="check"
          size={15}
          color={tw.color('white')}
        />
      )}
    </View>
  );
}

export default forwardRef(MyCheckBox);
