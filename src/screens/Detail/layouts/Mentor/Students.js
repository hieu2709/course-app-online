import React from 'react';
import { ScrollView, View } from 'react-native';
import StudentItem from '~/components/Student/StudentItem';
import tw from '~/libs/tailwind';
const listStudent = [
  {
    avatar: 'https://tapchianhdep.com/wp-content/uploads/2020/06/25-1.jpg',
    name: 'Benny Spanbauer',
    role: 'Student',
  },
  {
    avatar: 'https://tapchianhdep.com/wp-content/uploads/2020/06/25-1.jpg',
    name: 'Benny Spanbauer',
    role: 'Student',
  },
  {
    avatar: 'https://tapchianhdep.com/wp-content/uploads/2020/06/25-1.jpg',
    name: 'Benny Spanbauer',
    role: 'Student',
  },
  {
    avatar: 'https://tapchianhdep.com/wp-content/uploads/2020/06/25-1.jpg',
    name: 'Benny Spanbauer',
    role: 'Student',
  },
  {
    avatar: 'https://tapchianhdep.com/wp-content/uploads/2020/06/25-1.jpg',
    name: 'Benny Spanbauer',
    role: 'Student',
  },
  {
    avatar: 'https://tapchianhdep.com/wp-content/uploads/2020/06/25-1.jpg',
    name: 'Benny Spanbauer',
    role: 'Student',
  },
];
function Students() {
  return (
    <View style={tw`flex-1 `}>
      <ScrollView
        contentContainerStyle={tw`pb-10 pt-5`}
        showsVerticalScrollIndicator={false}>
        {listStudent?.map((item, i) => (
          <StudentItem key={i} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Students;
