import React from 'react';
import { Image } from 'react-native';

function MyImage({ style, src }) {
  // console.log(src);
  return (
    <Image
      style={style}
      source={src || require('~/assets/noavatar.png')}
      // resizeMode="cover"
    />
  );
}

export default MyImage;
