import React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import tw from '~/libs/tailwind';
import ReviewSearch from '../../components/ReviewsSearch';

function MyTabBarReview({ courseId }) {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'all', title: 'All' },
    { key: '5', title: '5' },
    { key: '4', title: '4' },
    { key: '3', title: '3' },
    { key: '2', title: '2' },
    { key: '1', title: '1' },
  ]);
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'all':
        return (
          <ReviewSearch
            jumpTo={jumpTo}
            rateSearch={0}
            courseId={courseId}
            index={index}
          />
        );
      case '5':
        return (
          <ReviewSearch
            jumpTo={jumpTo}
            rateSearch={5}
            courseId={courseId}
            index={index}
          />
        );
      case '4':
        return (
          <ReviewSearch
            jumpTo={jumpTo}
            rateSearch={4}
            courseId={courseId}
            index={index}
          />
        );
      case '3':
        return (
          <ReviewSearch
            jumpTo={jumpTo}
            rateSearch={3}
            courseId={courseId}
            index={index}
          />
        );
      case '2':
        return (
          <ReviewSearch
            jumpTo={jumpTo}
            rateSearch={2}
            courseId={courseId}
            index={index}
          />
        );
      case '1':
        return (
          <ReviewSearch
            jumpTo={jumpTo}
            rateSearch={1}
            courseId={courseId}
            index={index}
          />
        );
      default:
        return null;
    }
  };
  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      tabStyle={tw`w-auto overflow-hidden ml-3`}
      indicatorStyle={tw`bg-transparent`}
      style={tw`bg-${theme.bg} border-b border-t py-2 border-gray-border`}
      renderLabel={({ route, focused }) => (
        <View
          style={tw`flex-row items-center border-2 border-${
            focused ? 'blue' : 'gray'
          } rounded-full px-2 py-[0.5]`}>
          <Icon
            type="AntDesign"
            name="star"
            size={20}
            color={tw.color(`${focused ? 'blue' : 'gray'}`)}
          />
          <Text
            style={tw`font-qs-bold ml-1 text-base text-${
              focused ? 'blue' : 'gray'
            }`}>
            {route.title}
          </Text>
        </View>
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

export default MyTabBarReview;
