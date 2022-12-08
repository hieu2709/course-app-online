import React from 'react';
import { forwardRef } from 'react';
import { Text, View } from 'react-native';
import MyLoadingFull from '~/base/components/MyLoadingFull';
import LoadingIcon from '~/base/LoadingIcon';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import ModalCenter from '~/modals/ModalCenter';

function AlertMessage({ icon, title, message }, ref) {
  const { theme } = useTheme();
  return (
    <ModalCenter ref={ref} touchDisable={false}>
      <View style={tw`bg-${theme.bg} p-10 items-center `}>
        {icon && (
          <View
            style={tw`w-30 h-30 bg-blue rounded-full justify-center items-center`}>
            {icon}
          </View>
        )}
        {/* {icon || null} */}
        {title && (
          <Text style={tw`font-qs-bold text-2xl text-blue mt-10`}>{title}</Text>
        )}
        {message && (
          <Text
            style={tw`text-center mt-5 font-qs-medium text-base text-${theme.text}`}>
            {message}
          </Text>
        )}
        <LoadingIcon style={tw`w-20 h-20`} />
      </View>
    </ModalCenter>
  );
}

export default forwardRef(AlertMessage);
