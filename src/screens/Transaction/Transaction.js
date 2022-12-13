import { doc, setDoc } from 'firebase/firestore';
import React from 'react';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import MyToast from '~/base/components/MyToast';
import ButtonBack from '~/components/ButtonBack';
import MyButton from '~/components/MyButton';
import MyTextInput from '~/components/MyTextInput';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import { convertPriceToString, formatNumber } from '~/utils';

function Transaction() {
  const { theme } = useTheme();
  const { user, setUser } = useUser();
  const toastRef = useRef();
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const handleAgree = data => {
    const coins = Number(data?.coins) + user?.coins;
    const param = {
      ...user,
      coins,
    };
    try {
      setUser(param);
      const userRef = doc(db, 'users', user?.userId?.toString());
      setDoc(userRef, { coins: coins }, { merge: true });
      toastRef?.current?.open(
        true,
        `Bạn đã nạp ${formatNumber(data?.coins)} đ thành công!`,
      );
      resetField('coins');
    } catch (e) {
      console.log('error transaction', e);
      toastRef?.current?.open(false, 'Nạp tiền thất bại!');
    }
  };
  return (
    <Container>
      <View style={tw`flex-1 bg-${theme.bg}`}>
        <MyToast ref={toastRef} />
        <ButtonBack style={tw`mx-5 my-5`} title={'Nạp tiền'} />
        <TouchableWithoutFeedback style={tw`flex-1`} onPress={Keyboard.dismiss}>
          <View style={tw`flex-1 mx-5`}>
            <Controller
              name="coins"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <MyTextInput
                  placeholder={'Nhập số tiền bạn muốn nạp...'}
                  onChangeText={v => onChange(convertPriceToString(v))}
                  value={formatNumber(value)}
                  type={'numeric'}
                  leftIcon={{
                    type: 'FontAwesome5',
                    name: 'coins',
                    size: 20,
                  }}
                />
              )}
            />
            <Text style={tw`font-qs-regular text-red top--2 h-5 text-right`}>
              {errors?.coins && ' Không được bỏ trống!'}
            </Text>
            <MyButton title={'Đồng ý'} onPress={handleSubmit(handleAgree)} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Container>
  );
}

export default Transaction;
