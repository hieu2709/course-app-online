import React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import About from './About';
import Lessons from './Lessons';
import Reviews from './Reviews';
// const renderScene = SceneMap({
//   about: About,
//   lessons: Lessons,
//   reviews: Reviews,
// });

function MyTabBar({ onScroll }) {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'about', title: 'About' },
    { key: 'lessons', title: 'Lessons' },
    { key: 'reviews', title: 'Reviews' },
  ]);
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'about':
        return <About jumpTo={jumpTo} onScroll={onScroll} />;
      case 'lessons':
        return <Lessons jumpTo={jumpTo} onScroll={onScroll} />;
      case 'reviews':
        return <Reviews jumpTo={jumpTo} onScroll={onScroll} />;

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
