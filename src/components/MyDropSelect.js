import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function MyDropSelect({ value, onChange, list, selectStyle, dropStyle }) {
  const [isDrop, setIsDrop] = useState(false);
  // const animScaleY = useRef(new Animated.Value(0)).current;
  const animRotate = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animTranslateY = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();
  const handleSelect = item => {
    onChange(item);
  };
  const openDrop = () => {
    // console.log(isDrop);
    if (!isDrop) {
      setIsDrop(!isDrop);
      Animated.parallel([
        Animated.timing(animTranslateY, {
          toValue: 1,
          useNativeDriver: true,
          duration: 200,
        }),
        Animated.timing(animOpacity, {
          toValue: 1,
          useNativeDriver: true,
          duration: 200,
        }),
        Animated.timing(animRotate, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          duration: 200,
        }),
        Animated.timing(animOpacity, {
          toValue: 0,
          useNativeDriver: true,
          duration: 200,
        }),
        Animated.timing(animRotate, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => setIsDrop(!isDrop));
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={openDrop}
        style={[
          tw`justify-between flex-row items-center h-full px-4`,
          selectStyle,
        ]}>
        {value ? (
          <Text
            style={tw`text-${theme.text} text-[16px] leading-[20px] font-qs-semibold `}>
            {value?.name}
          </Text>
        ) : (
          <Text
            style={tw`text-gray text-[16px] leading-[20px] font-qs-semibold `}>
            Select gender
          </Text>
        )}
        <Animated.View
          style={{
            transform: [
              {
                rotate: animRotate?.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '-180deg'],
                }),
              },
            ],
          }}>
          <Icon
            type={'AntDesign'}
            name="caretdown"
            size={18}
            color={tw.color('gray')}
          />
        </Animated.View>
      </TouchableOpacity>
      {isDrop && (
        <Animated.ScrollView
          style={[
            tw`bg-${theme.bgInput} mt-2 px-4 py-3 shadow-lg`,
            {
              opacity: animOpacity,
              transform: [
                {
                  translateY: animTranslateY.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-30, 0],
                  }),
                },
              ],
            },
            dropStyle,
          ]}>
          {list?.map((item, i) => (
            <View key={i}>
              {i !== 0 && (
                <View
                  style={tw` w-full h-[0.5px] bg-${theme.text} opacity-20 `}
                />
              )}
              <TouchableOpacity
                style={tw`py-2`}
                onPress={() => {
                  handleSelect(item);
                  openDrop();
                }}>
                <Text style={tw`font-qs-semibold text-${theme.text}`}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.ScrollView>
      )}
    </View>
  );
}

export default MyDropSelect;
