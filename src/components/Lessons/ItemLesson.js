import { useNavigation } from '@react-navigation/native';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import React from 'react';
import { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import MyToast from '~/base/components/MyToast';
import Icon from '~/base/Icon';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';
import { convertMintoHrs } from '~/utils';

function ItemLesson({ item, style }) {
  const { theme } = useTheme();
  const { user } = useUser();
  const toastRef = useRef();
  const navigation = useNavigation();
  const gotoDetailLesson = () => {
    navigation.navigate('DetailLesson', {
      data: item,
    });
  };
  const myLessonRef = doc(
    collection(db, 'mylesson'),
    user?.userId?.toString() + '-' + item?.lessonId?.toString(),
  );
  const { data: myLesson, isLoading } = useFirestoreDocument(
    ['myLesson', user?.userId?.toString() + '-' + item?.lessonId?.toString()],
    myLessonRef,
    { subscribe: true },
  );
  const checkLessonLock = () => {
    toastRef?.current?.open(false, 'Hãy hoàn thành bài học phía trên!');
  };
  if (isLoading) {
    return <MyLoading text={'Đang tải...'} />;
  } else {
    return (
      <View
        style={[
          tw`flex-row items-center justify-between p-5 rounded-xl shadow-lg bg-${theme.bgInput}`,
          style,
        ]}>
        <MyToast ref={toastRef} />
        <View style={tw`flex-row`}>
          <View
            style={tw`w-12 h-12 bg-blueOpacity rounded-full justify-center items-center`}>
            <Text style={tw`font-qs-bold text-lg text-blue`}>
              {item.index < 10 ? `0${item.index}` : item.index}
            </Text>
          </View>
          <View style={tw`justify-between ml-4`}>
            <Text
              numberOfLines={1}
              style={tw`font-qs-bold text-base  w-55 text-${theme.text}`}>
              {item.lessonName}
            </Text>
            <Text style={tw`font-qs-medium text-${theme.text}`}>
              {convertMintoHrs(item.time)}
            </Text>
          </View>
        </View>
        {myLesson?.exists() ? (
          <TouchableOpacity
            style={tw`shadow-xl w-10`}
            onPress={gotoDetailLesson}>
            <Icon
              type="Ionicons"
              name="play-circle"
              size={40}
              color={tw.color('blue')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={tw`shadow-xl w-10 items-center`}
            onPress={checkLessonLock}>
            <Icon
              type="FontAwesome"
              name="lock"
              size={30}
              color={tw.color('gray')}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default ItemLesson;
