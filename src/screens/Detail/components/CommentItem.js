import ReadMore from '@fawazahmed/react-native-read-more';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import dayjs from 'dayjs';
import { collection, doc } from 'firebase/firestore';
import React from 'react';
import { Text, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import MyImage from '~/components/MyImage';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';

function CommentItem({ comment }) {
  const { theme } = useTheme();
  const userRef = doc(collection(db, 'users'), comment?.userId?.toString());
  const { data: user, isLoading } = useFirestoreDocument(
    ['user', comment?.userId],
    userRef,
    { subscribe: true },
  );

  if (isLoading) {
    return <MyLoading />;
  } else {
    return (
      <View style={tw`flex-row items-start`}>
        <MyImage style={tw`h-7 w-7 mr-2 rounded-full`} />
        <View
          style={tw`flex-1 bg-${theme.bgInput} px-2 rounded-xl pb-1 shadow`}>
          <Text style={tw`font-qs-bold text-sm`}>{user?.data()?.fullname}</Text>
          <ReadMore
            seeMoreText="Xem thêm"
            seeMoreStyle={tw`text-green`}
            seeLessText="Ẩn bớt"
            wrapperStyle={tw`flex-1`}
            numberOfLines={2}
            style={tw`font-qs-medium text-sm`}>
            {comment?.comment}
          </ReadMore>
          <Text style={tw`font-qs-semibold text-xs text-gray mt-1`}>
            {dayjs(
              new Date(
                comment?.dateCreated?.seconds * 1000 || comment?.dateCreated,
              ),
            ).format('DD/MM/YYYY - HH:MM')}
          </Text>
        </View>
      </View>
    );
  }
}

export default CommentItem;
