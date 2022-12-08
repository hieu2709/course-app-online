import React from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import tw from '~/libs/tailwind';
import SceneCourse from './SceneCourse';

function TabBarCourse({ scrollEnabled }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  // const renderScene = SceneMap({
  //   all: SceneCourse,
  //   design3d: SceneCourse,
  //   bussiness: SceneCourse,
  //   programming: SceneCourse,
  // });
  const [routes] = useState([
    { key: 'all', title: 'All' },
    { key: 'design3d', title: '3D Design' },
    { key: 'bussiness', title: 'Bussiness' },
    { key: 'programming', title: 'Programming' },
  ]);
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'all':
        return <SceneCourse jumpTo={jumpTo} scrollEnable={scrollEnabled} />;
      case 'design3d':
        return <SceneCourse jumpTo={jumpTo} scrollEnable={scrollEnabled} />;
      case 'bussiness':
        return <SceneCourse jumpTo={jumpTo} scrollEnable={scrollEnabled} />;
      case 'programming':
        return <SceneCourse jumpTo={jumpTo} scrollEnable={scrollEnabled} />;

      default:
        return null;
    }
  };
  const renderTabBar = props => (
    <TabBar
      {...props}
      tabStyle={tw`p-0 w-auto overflow-hidden ml-5`}
      style={tw`bg-transparent`}
      indicatorStyle={[tw`bg-transparent`]}
      scrollEnabled
      renderLabel={({ route, focused }) => (
        <View
          style={tw`bg-${
            focused ? 'blue' : 'transparent'
          } px-5 py-2 rounded-full border-2 border-blue`}>
          <Text style={tw`font-qs-bold text-${focused ? 'white' : 'blue'}`}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );
  return (
    <TabView
      style={tw`flex-1 h-200`}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{ width: layout.width }}
    />
  );
}

export default TabBarCourse;
