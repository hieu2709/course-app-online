import React from 'react';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import tw from '~/libs/tailwind';
function RadioGroup({ horzital = false, data, show = false, onSelect, value }) {
  const [isSelect, setIsSelect] = useState(value || 0);
  const handleSelect = (item, i) => {
    onSelect?.(item, i);
  };
  return (
    <ScrollView
      showsHorizontalScrollIndicator={show}
      showsVerticalScrollIndicator={show}
      horizontal={horzital}>
      {data?.map((item, i) => (
        <TouchableOpacity
          onPress={() => {
            setIsSelect(i);
            handleSelect(item, i);
          }}
          key={i}
          style={tw` border-2 flex-row items-center border-blue mr-3 ml-${
            i === 0 ? '5' : '0'
          } px-4 py-2 rounded-full my-3
           ${isSelect === i ? 'bg-blue' : 'bg-transparent'}`}>
          {item?.icon && (
            <View style={tw`mr-1`}>
              <Icon
                type={item?.icon?.type || ''}
                name={item?.icon?.name || ''}
                size={item?.icon?.size || 16}
                color={isSelect === i ? tw.color('white') : tw.color('blue')}
              />
            </View>
          )}
          <Text
            style={tw`font-qs-bold ${
              isSelect === i ? 'text-white' : 'text-blue'
            }`}>
            {item?.name || item?.text || ''}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default RadioGroup;
