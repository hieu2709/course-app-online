import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { collection, doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { Text, View } from 'react-native';
import { db } from '~/firebase/config';
import tw from '~/libs/tailwind';
function CategoryCourse({ categoryId }) {
  const categoryRef = doc(collection(db, 'category'), categoryId?.toString());
  const { data: category } = useFirestoreDocument(
    ['category', categoryId],
    categoryRef,
  );
  return (
    <View style={tw`bg-blueOpacity p-2 rounded-lg`}>
      <Text style={tw`font-qs-semibold text-xs text-blue`}>
        {category?.data()?.categoryName}
      </Text>
    </View>
  );
}

export default CategoryCourse;
