import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { collection, doc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from '~/base/Icon';
import MyButton from '~/components/MyButton';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';

function ModalEditReview({ close, courseId, review, rate, refetch }) {
  const [numStar, setNumStar] = useState(rate);
  const [myReview, setReview] = useState(review);
  const { theme } = useTheme();
  const { user } = useUser();
  const selectStar = num => {
    setNumStar(num);
    Keyboard.dismiss();
  };
  const myreviewRef = doc(
    collection(db, 'myreview'),
    user?.userId?.toString() + courseId?.toString(),
  );
  const mutation = useFirestoreDocumentMutation(
    myreviewRef,
    { merge: true },
    { onSettled: refetch },
  );
  const submitReview = () => {
    const param = {
      rate: numStar,
      review: myReview,
      dateUpdated: Timestamp.fromDate(new Date()),
    };
    mutation.mutate(param);
    close?.();
  };
  return (
    <View style={tw`p-5`}>
      <Text style={tw`font-qs-bold text-center text-base`}>
        Đánh giá của bạn về khóa học này!
      </Text>
      <TextInput
        multiline={true}
        autoFocus={true}
        selectTextOnFocus={true}
        style={tw`bg-${theme.bgInput} shadow-xl mt-5 h-20 text-${theme.text}  text-[16px] leading-[20px] font-qs-semibold p-3 rounded-xl`}
        placeholder="Viết đánh giá..."
        placeholderTextColor={tw.color('gray')}
        value={myReview}
        onChangeText={t => setReview(t)}
      />
      <View style={tw`flex-row justify-center mt-3`}>
        {Array(5)
          .fill(0)
          ?.map((item, index) =>
            index + 1 <= numStar ? (
              <TouchableOpacity
                style={tw` ml-${index !== 0 ? '3' : '0'}`}
                key={index}
                onPress={() => selectStar(index + 1)}>
                <Icon
                  type={'AntDesign'}
                  name="star"
                  size={30}
                  color={tw.color('yellow')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={tw` ml-${index !== 0 ? '3' : '0'}`}
                key={index}
                onPress={() => selectStar(index + 1)}>
                <Icon
                  type={'AntDesign'}
                  name="staro"
                  size={30}
                  color={tw.color('gray')}
                />
              </TouchableOpacity>
            ),
          )}
      </View>
      <View style={tw` mb-10 mt-3 mb-10 flex-row items-center justify-between`}>
        <MyButton
          titleColor={tw.color('blue')}
          title={'Hủy'}
          style={tw` flex-1 bg-blueOpacity mr-2`}
          onPress={() => close?.()}
        />
        <MyButton
          title={'Đánh giá lại'}
          style={tw` flex-1 ml-2`}
          onPress={submitReview}
        />
      </View>
    </View>
  );
}

export default ModalEditReview;
