import React from 'react';
import { useRef } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { useState } from 'react';
import { Animated, Text } from 'react-native';
import { Portal } from 'react-native-paper';
import tw from '~/libs/tailwind';

function MyToast({ style }, ref) {
  const [visible, setVisible] = useState(false);
  const [textt, setText] = useState('');
  const [statuss, setStatus] = useState(true);
  const anim = useRef(new Animated.Value(0)).current;
  const openToast = (status, t) => {
    setStatus(status);
    setText(t);
    setVisible(true);
    Animated.timing(anim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const closeToast = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      setStatus(true);
      setText('');
    });
  };
  useImperativeHandle(ref, () => ({
    open: (status, t) => {
      openToast(status, t);
      setTimeout(() => {
        closeToast();
      }, 1500);
    },
    close: () => closeToast(),
  }));
  if (!visible) {
    return null;
  } else {
    return (
      <Portal>
        <Animated.View
          style={[
            tw`px-10 h-12 bg-${
              statuss ? 'green' : 'red'
            }  z-1000 absolute justify-center items-center rounded-3xl top-15 right-5`,
            style,
            {
              transform: [
                {
                  translateX: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [250, 0],
                  }),
                },
              ],
            },
          ]}>
          <Text style={tw`font-qs-bold text-white`}>{textt || null}</Text>
        </Animated.View>
      </Portal>
    );
  }
}

export default forwardRef(MyToast);
