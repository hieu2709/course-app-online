import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, limit, query, where } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MyLoading from '~/base/components/MyLoading';
import Icon from '~/base/Icon';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import { formatNumber } from '~/utils';
import ItemCourse from './ItemCourse';

const listCourse = [
  {
    image:
      'https://res.edu.vn/wp-content/uploads/2021/12/unit-2-about-the-course-1.jpg',
    categoryName: '3D Design',
    courseName: '3D Design Illustration',
    priceSale: 48,
    price: 80,
    students: 8289,
    rate: 4.8,
    isBookMark: true,
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScEpkvJcAu0c5nmazVuWtbehH7qYEVflL02A&usqp=CAU',
    categoryName: 'Programming',
    courseName: 'Flutter Mobile Apps',
    priceSale: 44,
    price: 72,
    students: 9928,
    rate: 4.8,
    isBookMark: false,
  },
  {
    image:
      'https://www.lvchn.edu.vn/images/medium/2020/08/03/free-online-course-on-learning-to-teach-online-1024x577.jpeg',
    categoryName: 'Entrepeneurship',
    courseName: 'Digital Entrepeneurship',
    priceSale: 0,
    price: 39,
    students: 6182,
    rate: 4.9,
    isBookMark: false,
  },
  {
    image:
      'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202009/e-learning_digital_education-1200x1080.jpg?XjMNHsb4gLoU_cC7110HB7jVghJQROOj',
    categoryName: 'UI/UX Design',
    courseName: 'Learn UX User Persona',
    priceSale: 42,
    price: 75,
    students: 7398,
    rate: 4.7,
    isBookMark: true,
  },
];
function SceneCourse({ categoryId }) {
  const { theme } = useTheme();

  const courseRef = collection(db, 'courses');
  const ref = categoryId
    ? query(courseRef, where('categoryId', '==', categoryId), limit(4))
    : query(courseRef, limit(4));
  const { data, isLoading } = useFirestoreQuery(
    ['course-limit', categoryId || 'all'],
    ref,
  );

  if (isLoading) {
    return <MyLoading text={'Loading'} />;
  } else {
    return (
      <ScrollView style={tw`flex-1`}>
        {data?.docs?.map((item, i) => (
          <ItemCourse key={i} item={item?.data()} />
        ))}
      </ScrollView>
    );
  }
}

export default SceneCourse;
