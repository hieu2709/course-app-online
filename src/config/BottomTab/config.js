import Icon from '~/base/Icon';
import React from 'react';
import tw from '~/libs/tailwind';
import { View } from 'react-native';

export default [
  {
    name: 'Home',
    component: require('~/config/BottomTab/Home').default,
    options: {
      tabBarIcon: ({ focused, color }) => {
        return <Icon type="Ionicons" name="home" size={24} color={color} />;
      },
      tabBarActiveTintColor: tw.color('blue'),
      tabBarLabel: 'Home',

      // tabBarActiveBackgroundColor: COLOR.THEM_SOFT,
    },
  },
  {
    name: 'Mycourse',
    component: require('~/config/BottomTab/MyCourse').default,
    options: {
      tabBarIcon: ({ focused, color }) => {
        return (
          <Icon
            type="FontAwesome5"
            name="clipboard-list"
            size={24}
            color={color}
          />
        );
      },
      tabBarActiveTintColor: tw.color('blue'),
      tabBarLabel: 'My Course',

      // tabBarActiveBackgroundColor: COLOR.THEM_SOFT,
    },
  },
  {
    name: 'bookmark',
    component: require('~/config/BottomTab/Bookmark').default,
    options: {
      tabBarIcon: ({ focused, color }) => {
        return (
          <Icon type="FontAwesome" name="bookmark" size={24} color={color} />
        );
      },
      tabBarActiveTintColor: tw.color('blue'),
      tabBarLabel: 'Bookmark',

      // tabBarActiveBackgroundColor: COLOR.THEM_SOFT,
    },
  },
  {
    name: 'profile',
    component: require('~/config/BottomTab/Profile').default,
    options: {
      tabBarIcon: ({ focused, color }) => {
        return <Icon type="FontAwesome" name="user" size={24} color={color} />;
      },
      tabBarActiveTintColor: tw.color('blue'),
      tabBarLabel: 'Profile',

      // tabBarActiveBackgroundColor: COLOR.THEM_SOFT,
    },
  },
];
