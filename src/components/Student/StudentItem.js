import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import Icon from '~/base/Icon';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import MyImage from '../MyImage';

function StudentItem({ userId }) {
  const { theme } = useTheme();
  const userRef = doc(collection(db, 'users'), userId?.toString());
  const { data: user, isLoading } = useFirestoreDocument(
    ['student', userId?.toString()],
    userRef,
  );

  if (isLoading) {
    return <MyLoading text={'Đang tải'} />;
  } else {
    return (
      <View
        style={tw`flex-row items-center justify-between px-5 shadow bg-${theme.bg} mb-2 py-3`}>
        <View style={tw`flex-row items-center`}>
          <MyImage
            src={user?.data()?.avatar ? { uri: user?.data()?.avatar } : null}
            style={tw`w-12 h-12 rounded-full`}
          />
          <View style={tw`ml-4`}>
            <Text style={tw`font-qs-bold text-base text-${theme.text}`}>
              {user?.data().fullname || ''}
            </Text>
            {/* <Text style={tw`font-qs-regular text-sm text-${theme.text}`}>
            {user?.data().role || ''}
          </Text> */}
          </View>
        </View>
        <TouchableOpacity>
          <Icon
            type="AntDesign"
            name="message1"
            size={26}
            color={tw.color('blue')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default StudentItem;
