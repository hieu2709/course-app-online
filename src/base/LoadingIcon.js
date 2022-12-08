import React from 'react';
import { View } from 'react-native';
import tw from '~/libs/tailwind';
import LottieView from 'lottie-react-native';
import changeSVGColor from '@killerwink/lottie-react-native-color';

function LoadingIcon({ style, color }) {
  return (
    <View style={[style]}>
      <LottieView
        source={changeSVGColor(
          require('~/assets/loading.json'),
          color || tw.color('blue'),
        )}
        autoPlay
        loop
      />
    </View>
  );
}

export default LoadingIcon;
