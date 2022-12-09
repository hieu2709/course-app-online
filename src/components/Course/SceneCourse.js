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
