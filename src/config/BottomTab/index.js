import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import config from './config';
import useTheme from '~/hooks/useTheme';

const Tab = createBottomTabNavigator();
function BottomTabNavigation() {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {config.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            headerShown: false,
            tabBarStyle: {
              height: 80,
              paddingTop: 10,
              // paddingBottom: 25,
              backgroundColor: theme.bg,
            },
            ...item.options,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
export default BottomTabNavigation;
