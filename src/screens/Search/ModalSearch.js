import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, limit, orderBy, query, where } from 'firebase/firestore';
import React, { useCallback } from 'react';
import { useState } from 'react';
import { Keyboard, Text, TouchableNativeFeedback, View } from 'react-native';
import Slider from '@react-native-community/slider';
import MyLoading from '~/base/components/MyLoading';
import MyButton from '~/components/MyButton';
import MyTextInput from '~/components/MyTextInput';
import RadioGroup from '~/components/RadioGroup';
import Label from '~/components/Slider/Label';
import Notch from '~/components/Slider/Notch';
import Rail from '~/components/Slider/Rail';
import RailSelected from '~/components/Slider/RailSelected';
import Thumb from '~/components/Slider/Thumb';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { formatNumber } from '~/utils';
const typeList = [
  {
    name: 'Khóa học',
    value: 0,
  },
  {
    name: 'Giáo viên',
    value: 1,
  },
];

function ModalSearch({ close, value, setValue }) {
  const [val, setVal] = useState(value?.search || '');
  const [low, setLow] = useState(0);
  const [visible, setVisible] = useState(false);
  const [high, setHigh] = useState(0);
  const { theme } = useTheme();
  const [type, setType] = useState(value?.type || typeList[0].value);
  const categoryRef = query(collection(db, 'category'));
  const [cateSelect, setCateSelect] = useState(value?.cateSelect || 0);
  const { data, isLoading } = useFirestoreQuery(['category'], categoryRef);
  const courseRef = query(
    collection(db, 'courses'),
    orderBy('price', 'desc'),
    limit(1),
  );
  const { data: course, isLoading: isLoadingCourse } = useFirestoreQuery(
    ['course-max-price'],
    courseRef,
    { subscribe: true },
  );

  const submit = () => {
    const param = {
      search: val,
      type,
      cateSelect,
      low,
      high,
    };
    setValue(param);
    close?.();
  };

  if (isLoading || isLoadingCourse) {
    return <MyLoading />;
  } else {
    const category = data?.docs?.map(d => {
      return { name: d?.data()?.categoryName, value: d?.data()?.categoryID };
    });
    return (
      <TouchableNativeFeedback style={tw`flex-1`} onPress={Keyboard.dismiss}>
        <View style={tw`pt-10 pb-10 rounded-t-3xl bg-${theme.bg}`}>
          <View style={tw`py-5 items-center mx-5 border-b-[0.2px] border-gray`}>
            <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
              Tìm kiếm?
            </Text>
          </View>
          <View style={tw`mt-5 border-b-[0.2px] border-gray`}>
            <View style={tw`mx-5 shadow-lg`}>
              <MyTextInput
                value={val}
                onChangeText={v => setVal(v)}
                placeholder={'Tên'}
              />
            </View>
            <RadioGroup
              data={typeList}
              horzital={true}
              value={type}
              onSelect={(item, i) => {
                setType(item?.value);
              }}
            />
            {type === 0 && (
              <View>
                <Text
                  style={tw`font-qs-bold text-base text-${theme.text} ml-5`}>
                  Giá thấp nhất: {formatNumber(low)} VNĐ
                </Text>
                <Slider
                  style={tw`mx-5 h-10`}
                  minimumValue={0}
                  maximumValue={course?.docs[0]?.data().price}
                  step={100000}
                  value={low}
                  minimumTrackTintColor={tw.color('blue')}
                  maximumTrackTintColor={tw.color('gray')}
                  onValueChange={v => setLow(v)}
                  onSlidingStart={v => {
                    setVisible(false);
                  }}
                  onSlidingComplete={v => {
                    setVisible(true);
                    setHigh(v);
                  }}
                />

                {visible && (
                  <View>
                    <Text
                      style={tw`font-qs-bold text-base text-${theme.text} ml-5`}>
                      Giá cao nhất: {formatNumber(high)} VNĐ
                    </Text>
                    <Slider
                      style={tw`mx-5 h-10`}
                      minimumValue={low}
                      maximumValue={course?.docs[0]?.data().price}
                      step={100000}
                      value={high}
                      minimumTrackTintColor={tw.color('blue')}
                      maximumTrackTintColor={tw.color('gray')}
                      onValueChange={v => setHigh(v)}
                    />
                  </View>
                )}

                <Text
                  style={tw`font-qs-bold text-base text-${theme.text} ml-5`}>
                  Thể loại
                </Text>
                <RadioGroup
                  data={[{ name: 'Tất cả', value: 0 }, ...category]}
                  horzital={true}
                  value={cateSelect}
                  onSelect={(item, i) => {
                    setCateSelect(item?.value);
                  }}
                />
              </View>
            )}
          </View>
          <View
            style={tw`flex-row items-center h-16 mt-6 overflow-hidden px-5 `}>
            <MyButton
              title={'Quay lại'}
              style={tw`flex-1 h-14 bg-blueOpacity mr-2`}
              titleColor={tw.color('blue')}
              onPress={close}
            />
            <MyButton
              title={'Tìm kiếm '}
              style={tw`flex-1 h-14 bg-blue ml-2`}
              titleColor={tw.color('white')}
              onPress={submit}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
export default ModalSearch;
