import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, query, where } from 'firebase/firestore';
import React from 'react';
import { ScrollView } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import ItemCourse from '~/components/Course/ItemCourse';
import { db } from '~/firebase/config';
import tw from '~/libs/tailwind';

function Courses({ mentorId }) {
  const courseRef = collection(db, 'courses');
  const ref = mentorId
    ? query(courseRef, where('mentorID', '==', mentorId))
    : query(courseRef);
  const { data, isLoading } = useFirestoreQuery(
    ['course-mentor', mentorId || 'all'],
    ref,
  );

  if (isLoading) {
    return <MyLoading text={'Đang tải dữ liệu...'} />;
  } else {
    return (
      <ScrollView style={tw`flex-1`}>
        {data?.docs?.map((item, i) => (
          <ItemCourse key={i} courseId={item?.data()?.courseID} />
        ))}
      </ScrollView>
    );
  }
}

export default Courses;
