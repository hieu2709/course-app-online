import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useState } from 'react';
import { Animated, Modal, TouchableOpacity } from 'react-native';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function ModalCenter({ children, loading, touchDisable }, ref) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const OpenModal = () => {
    setVisible(!visible);
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const CloseModal = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(!visible));
  };
  useImperativeHandle(ref, () => ({
    openModal: () => OpenModal(),
    closeModal: () => CloseModal(),
  }));
  return (
    <Modal transparent={true} visible={visible}>
      <Animated.View
        style={[
          tw`flex-1 bg-[#060606CC] justify-center`,
          { opacity: opacityValue },
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          disabled={touchDisable}
          style={tw`absolute w-full h-full`}
          onPress={() => {
            CloseModal();
          }}
        />
        <Animated.View
          style={[
            tw`bg-${theme.bg} mx-5 overflow-hidden rounded-2xl shadow-xl `,
            {
              transform: [
                {
                  scale: scaleValue,
                },
              ],
            },
          ]}>
          {children}
        </Animated.View>
        {loading}
      </Animated.View>
    </Modal>
  );
}

export default forwardRef(ModalCenter);
