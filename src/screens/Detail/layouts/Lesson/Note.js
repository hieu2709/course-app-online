import ReadMore from '@fawazahmed/react-native-read-more';
import {
  useFirestoreDocument,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MyLoading from '~/base/components/MyLoading';
import MyToast from '~/base/components/MyToast';
import Icon from '~/base/Icon';
import MyTextInput from '~/components/MyTextInput';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';
import { convertSecondtoHours } from '~/utils';

function Note({ lessonId, videoRef, pause, resume }) {
  const { theme } = useTheme();
  const [note, setNote] = useState('');
  const { user } = useUser();
  const toastRef = useRef();
  const myLessonRef = doc(
    collection(db, 'mylesson'),
    user?.userId?.toString() + lessonId?.toString(),
  );

  const { data: myLesson, isLoading } = useFirestoreDocument(
    ['myLesson', user?.userId?.toString() + lessonId?.toString()],
    myLessonRef,
    { subscribe: true },
  );
  const mutation = useFirestoreDocumentMutation(myLessonRef, { merge: true });
  const submitNote = () => {
    // console.log('submit');
    videoRef?.current
      ?.getCurrentTime()
      .then(time => {
        if (note) {
          mutation?.mutate({
            notes: [
              ...(myLesson?.data()?.notes || []),
              {
                time: time,
                note: note,
              },
            ],
          });
          setNote('');
          Keyboard.dismiss();
        } else {
          toastRef?.current?.open(false, 'Chưa nhập nội dung ghi chú');
        }
      })
      .catch(() =>
        toastRef?.current?.open(
          false,
          'Không thể tạo ghi chú khi chưa xem video',
        ),
      );
  };
  const seekToTime = time => {
    videoRef?.current?.seekTo(time, true);
  };
  const onFocusTextInput = () => {
    pause?.();
  };
  const onBlurTextInput = () => {
    resume?.();
  };
  if (isLoading) {
    return <MyLoading text={'Đang tải dữ liệu'} />;
  } else {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={tw`flex-1`}
        horizontal={true}
        contentContainerStyle={tw`flex-1`}
        extraScrollHeight={10}>
        <View style={tw`flex-1`}>
          <MyToast ref={toastRef} />
          <ScrollView
            style={tw`flex-1 mb-2`}
            contentContainerStyle={tw`mx-5 pt-2  pb-5`}>
            {myLesson?.data()?.notes?.map((n, i) => (
              <View key={i} style={tw`flex-row`}>
                <TouchableOpacity onPress={() => seekToTime(n?.time)}>
                  <Text style={tw`font-qs-semibold text-base text-blue`}>
                    {convertSecondtoHours(n?.time)}
                  </Text>
                </TouchableOpacity>
                <Text style={tw`font-qs-medium text-base text-${theme.text}`}>
                  {' '}
                  :{' '}
                </Text>
                <ReadMore
                  seeMoreText="Xem thêm"
                  seeMoreStyle={tw`text-green`}
                  seeLessText="Ẩn bớt"
                  numberOfLines={2}
                  style={tw`font-qs-regular text-base text-${theme.text}`}
                  wrapperStyle={tw`flex-1`}>
                  {n?.note}
                </ReadMore>
              </View>
            ))}
          </ScrollView>
          <View style={tw` mb-5 pl-5 pr-2 flex-row `}>
            <MyTextInput
              value={note}
              onChangeText={v => {
                setNote(v);
              }}
              placeholder={'Thêm ghi chú...'}
              style={tw`h-10 shadow-xl  flex-1`}
              onFocus={onFocusTextInput}
              onBlur={onBlurTextInput}
            />
            <TouchableOpacity
              style={tw` h-10 justify-center px-3 shadow-xl`}
              onPress={submitNote}>
              <Icon
                type="FontAwesome"
                name="send"
                size={20}
                color={tw.color('blue')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Note;
