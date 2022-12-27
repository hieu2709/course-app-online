import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { collection, doc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from '~/base/Icon';
import MyButton from '~/components/MyButton';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';

function ModalReview({ close, courseId }) {
  const [numStar, setNumStar] = useState(5);
  const [review, setReview] = useState('');
  const { theme } = useTheme();
  const { user } = useUser();

  const selectStar = num => {
    setNumStar(num);
    Keyboard.dismiss();
  };
  const myreviewRef = doc(
    collection(db, 'myreview'),
    user?.userId?.toString() + '-' + courseId?.toString(),
  );
  const mutation = useFirestoreDocumentMutation(
    myreviewRef,
    {},
    {},
    // { onSettled: refetch },
  );
  const submitReview = async () => {
    const param = {
      userId: user?.userId,
      courseId: courseId,
      rate: numStar,
      review: review,
      dateUpdated: Timestamp.fromDate(new Date()),
    };

    mutation.mutate(param);
    close?.();
  };
  return (
    <KeyboardAvoidingView behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`p-5`}>
          <Text style={tw`font-qs-bold text-center text-base`}>
            Bạn đã hoàn thành khóa học này! Hãy đánh giá chất lượng khóa học để
            chúng tôi biết cảm nhận của bạn nhé!
          </Text>
          <TextInput
            multiline={true}
            autoFocus={true}
            selectTextOnFocus={true}
            style={tw`bg-${theme.bgInput} shadow-xl mt-5 h-20 text-${theme.text}  text-[16px] leading-[20px] font-qs-semibold p-3 rounded-xl`}
            placeholder="Viết đánh giá..."
            placeholderTextColor={tw.color('gray')}
            value={review}
            onChangeText={t => setReview(t)}
          />
          <View style={tw`flex-row justify-center mt-5`}>
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
          <MyButton
            title={'Gửi đánh giá'}
            style={tw`mt-5 mb-10`}
            onPress={submitReview}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default ModalReview;
