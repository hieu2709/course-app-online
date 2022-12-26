import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, query } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { Keyboard, Text, TouchableNativeFeedback, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import MyButton from '~/components/MyButton';
import MyTextInput from '~/components/MyTextInput';
import RadioGroup from '~/components/RadioGroup';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
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
  const { theme } = useTheme();
  const [type, setType] = useState(value?.type || typeList[0].value);
  const categoryRef = query(collection(db, 'category'));
  const [cateSelect, setCateSelect] = useState(value?.cateSelect || 0);
  const { data, isLoading } = useFirestoreQuery(['category'], categoryRef);
  const submit = () => {
    const param = {
      search: val,
      type,
      cateSelect,
    };
    setValue(param);
    close?.();
  };
  if (isLoading) {
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
              Lọc dữ liệu?
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
