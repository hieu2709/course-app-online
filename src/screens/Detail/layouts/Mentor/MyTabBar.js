import React from 'react';
import { useState } from 'react';
import { Text } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import Courses from './Courses';
import Students from './Students';

function MyTabBar({ mentorId }) {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'courses', title: 'Khóa học' },
    { key: 'students', title: 'Học sinh' },
  ]);
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'courses':
        return <Courses jumpTo={jumpTo} mentorId={mentorId} />;
      case 'students':
        return <Students jumpTo={jumpTo} mentorId={mentorId} />;
      default:
        return null;
    }
  };
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={tw`bg-blue h-1 rounded-full`}
      style={tw`bg-${theme.bg} border-b border-t pt-2 mx-5 border-gray-border`}
      renderLabel={({ route, focused }) => (
        <Text
          style={tw`font-qs-bold text-base text-${focused ? 'blue' : 'gray'}`}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      style={tw`flex-1 bg-${theme.bg}`}
      swipeEnabled
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
    />
  );
}

export default MyTabBar;
