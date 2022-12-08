import React from 'react';
import { forwardRef } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { useState } from 'react';
import { Animated, Modal, TouchableOpacity, View } from 'react-native';
import tw from '~/libs/tailwind';

function BottomModal({ children }, ref) {
  const [visible, setVisible] = useState(false);
  const animTranslateY = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const openModal = () => {
    setVisible(!visible);
    Animated.parallel([
      Animated.spring(animTranslateY, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(animOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const closeModal = () => {
    Animated.parallel([
      Animated.timing(animTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(!visible));
  };
  useImperativeHandle(ref, () => ({
    open: () => openModal(),
    close: () => closeModal(),
  }));
  return (
    <Modal transparent visible={visible}>
      <Animated.View style={[tw`flex-1 justify-end`, { opacity: animOpacity }]}>
        <TouchableOpacity
          activeOpacity={1}
          style={tw`absolute w-full h-full bg-[#060606CC]`}
          onPress={() => closeModal()}
        />
        <Animated.View
          style={{
            transform: [
              {
                translateY: animTranslateY?.interpolate({
                  inputRange: [0, 1],
                  outputRange: [400, 0],
                }),
              },
            ],
          }}>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

export default forwardRef(BottomModal);
