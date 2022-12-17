import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, query, where } from 'firebase/firestore';
import React from 'react';
import { ScrollView } from 'react-native';
import ItemCourse from '~/components/Course/ItemCourse';
import { db } from '~/firebase/config';
import useUser from '~/hooks/useUser';

function ListCourseBookmark() {
  const { user } = useUser();
  const docRef = collection(db, 'mycourse');
  const q = query(
    docRef,
    where('isBookmark', '==', true),
    where('userId', '==', user?.userId || ''),
  );
  const { data: myCourseBookmark, refetch } = useFirestoreQuery(
    ['mycourse-bookmark'],
    q,
    { subscribe: true },
  );
  return (
    <ScrollView>
      {myCourseBookmark?.docs?.map((item, i) => {
        if (item?.data().isBookmark) {
          return <ItemCourse key={i} courseId={item?.data()?.courseId} />;
        } else {
          return null;
        }
      })}
    </ScrollView>
  );
}

export default ListCourseBookmark;
