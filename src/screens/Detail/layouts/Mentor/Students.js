import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, query, where } from 'firebase/firestore';
import React from 'react';
import { ScrollView, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import StudentItem from '~/components/Student/StudentItem';
import { db } from '~/firebase/config';
import tw from '~/libs/tailwind';

function Students({ mentorId }) {
  const ref = query(collection(db, 'class'), where('mentorID', '==', mentorId));
  const { data, isLoading } = useFirestoreQuery(['users-class', mentorId], ref);
  if (isLoading) {
    return <MyLoading text={'Đang tải dữ liệu...'} />;
  } else {
    return (
      <View style={tw`flex-1 `}>
        <ScrollView
          contentContainerStyle={tw`pb-10 pt-5`}
          showsVerticalScrollIndicator={false}>
          {data?.docs?.map((item, i) => (
            <StudentItem key={i} userId={item?.data()?.userId} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default Students;
