import React from 'react';
import { useState } from 'react';
import { Text } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import Certificate from './Certificates';
import Lessons from './Lessons';

// const renderScene = SceneMap({
//   about: About,
//   lessons: Lessons,
//   reviews: Reviews,
// });

function MyTabView({ onScroll }) {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([{ key: 'lessons', title: 'Lessons' }]);
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'lessons':
        return <Lessons jumpTo={jumpTo} />;

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
      swipeEnabled={false}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
    />
  );
}

export default MyTabView;
