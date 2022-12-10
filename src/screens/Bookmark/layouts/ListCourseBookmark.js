import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import ItemCourse from '~/components/Course/ItemCourse';
import { db } from '~/firebase/config';

function ListCourseBookmark() {
  const [ListCourse, setListCourse] = useState([]);
  useEffect(() => {
    setListCourse([]);
    const getList = async () => {
      const docRef = collection(db, 'mycourse');
      const q = query(docRef, where('isBookmark', '==', true));
      const snapShot = await getDocs(q);
      snapShot.forEach(async d => {
        const newMyCourse = { ...d.data() };
        const courseRef = doc(db, 'courses', d.data().courseId.toString());
        const docSnap = await getDoc(courseRef);
        if (docSnap.exists()) {
          // console.log(docSnap.data());
          newMyCourse.course = { ...docSnap.data() };
        }
        setListCourse(prev => [...prev, newMyCourse]);
      });
    };
    getList();
  }, []);

  return (
    <ScrollView>
      {ListCourse?.map((item, i) => (
        <ItemCourse key={i} item={item?.course} />
      ))}
    </ScrollView>
  );
}

export default ListCourseBookmark;
