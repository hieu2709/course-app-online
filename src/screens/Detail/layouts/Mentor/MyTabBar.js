import React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import Courses from './Courses';
import Reviews from './Reviews';
import Students from './Students';
// const renderScene = SceneMap({
//   about: About,
//   lessons: Lessons,
//   reviews: Reviews,
// });

function MyTabBar({ onScroll }) {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'courses', title: 'Courses' },
    { key: 'students', title: 'Students' },
  ]);
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'courses':
        return <Courses jumpTo={jumpTo} />;
      case 'students':
        return <Students jumpTo={jumpTo} />;
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
