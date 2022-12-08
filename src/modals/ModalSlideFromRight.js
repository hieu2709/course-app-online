import React from 'react';
import { useRef } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { useState } from 'react';
import { Animated, Modal, useWindowDimensions } from 'react-native';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function ModalSlideFromRight({ children }, ref) {
  const { theme } = useTheme();
  const layout = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const animTranslateX = useRef(new Animated.Value(0)).current;
  const OpenModal = () => {
    setVisible(!visible);
    Animated.parallel([
      Animated.timing(animTranslateX, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // Animated.spring(opacityValue, {
      //   toValue: 1,
      //   duration: 300,
      //   useNativeDriver: true,
      // }),
    ]).start();
  };
  const CloseModal = () => {
    Animated.parallel([
      Animated.timing(animTranslateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      // Animated.timing(opacityValue, {
      //   toValue: 0,
      //   duration: 300,
      //   useNativeDriver: true,
      // }),
    ]).start(() => setVisible(!visible));
  };
  useImperativeHandle(ref, () => ({
    open: () => OpenModal(),
    close: () => CloseModal(),
  }));
  return (
    <Modal transparent={true} visible={visible}>
      <Animated.View
        style={[
          tw`bg-${theme.bg} flex-1`,
          {
            transform: [
              {
                translateX: animTranslateX?.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layout.width, 0],
                }),
              },
            ],
          },
        ]}>
        {children}
      </Animated.View>
    </Modal>
  );
}

export default forwardRef(ModalSlideFromRight);
