import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function MyTextInput(
  {
    value,
    onChangeText,
    style,
    placeholder,
    isPassword = false,
    leftIcon,
    rightIcon,
    capitalize = false,
    type,
  },
  ref,
) {
  const [isFocus, setIsFocus] = useState(false);
  const [isHide, setIsHide] = useState(true);
  const { theme } = useTheme();
  const pressEye = () => {
    setIsHide(!isHide);
  };
  const renderRightIcon = () => {
    switch (rightIcon?.onPress) {
      case 'hidden':
        return (
          <TouchableOpacity onPress={() => pressEye()}>
            <Icon
              type={rightIcon?.type}
              name={isHide ? rightIcon?.name?.eyeoff : rightIcon?.name?.eye}
              size={rightIcon?.size || 20}
              color={
                rightIcon?.color || isFocus
                  ? tw.color('blue')
                  : tw.color('gray')
              }
            />
          </TouchableOpacity>
        );
      default:
        return rightIcon?.onPress ? (
          <TouchableOpacity onPress={rightIcon?.onPress}>
            <Icon
              type={rightIcon?.type}
              name={rightIcon?.name}
              size={rightIcon?.size || 20}
              color={
                rightIcon?.color || isFocus
                  ? tw.color('blue')
                  : tw.color('gray')
              }
            />
          </TouchableOpacity>
        ) : (
          <Icon
            type={rightIcon?.type}
            name={rightIcon?.name}
            size={rightIcon?.size || 20}
            color={
              rightIcon?.color || isFocus ? tw.color('blue') : tw.color('gray')
            }
          />
        );
    }
  };
  return (
    <View
      style={[
        tw`mb-4 flex-row h-14 bg-${
          isFocus ? 'blueOpacity' : `${theme.bgInput}`
        } px-4 rounded-xl items-center border border-${
          isFocus ? 'blue' : 'transparent'
        }`,
        style,
      ]}>
      <View
        style={tw`mr-${leftIcon ? '2' : '0'} w-${
          leftIcon ? '5' : '0'
        } items-center`}>
        {leftIcon && (
          <Icon
            type={leftIcon?.type}
            name={leftIcon?.name}
            size={leftIcon?.size || 20}
            color={
              leftIcon?.color || isFocus ? tw.color('blue') : tw.color('gray')
            }
          />
        )}
      </View>
      <TextInput
        onFocus={() => setIsFocus(!isFocus)}
        onBlur={() => setIsFocus(!isFocus)}
        autoCapitalize={capitalize}
        secureTextEntry={isPassword && isHide}
        keyboardType={type}
        selectTextOnFocus={true}
        placeholder={placeholder}
        placeholderTextColor={tw.color('gray')}
        style={[
          tw`flex-1 text-${theme.text}  text-[16px] leading-[20px] font-qs-semibold`,
          style,
        ]}
        onChangeText={onChangeText}
        value={value}
      />
      <View style={tw`w-${rightIcon ? '5' : '0'} items-center`}>
        {rightIcon && renderRightIcon(rightIcon)}
      </View>
    </View>
  );
}

export default forwardRef(MyTextInput);
