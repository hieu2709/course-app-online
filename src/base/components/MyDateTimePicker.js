import React, { forwardRef, useImperativeHandle, useState } from 'react';
// import RNDateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import tw from '~/libs/tailwind';
import BottomModal from '../../modals/BottomModal';
import useTheme from '~/hooks/useTheme';
import Icon from '../Icon';
function MyDateTimePicker({ style, value, onChange }, ref) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const theme = useTheme();
  // console.log('date', value);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <View style={[style]}>
      <TouchableOpacity
        onPress={showDatePicker}
        style={[
          tw`mb-4 justify-between flex-row h-14 bg-${theme.bgInput} items-center px-4 rounded-xl`,
        ]}>
        <Text
          style={tw`text-[16px] leading-[20px] font-qs-semibold text-${theme.text}`}>
          {dayjs(value || new Date())?.format('DD/MM/YYYY')}
        </Text>
        <Icon
          type="AntDesign"
          name="calendar"
          size={20}
          color={tw.color('gray')}
        />
      </TouchableOpacity>

      <View style={tw`w-full`}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          // isDarkModeEnabled={false}
        />
      </View>
    </View>
  );
}

export default forwardRef(MyDateTimePicker);
