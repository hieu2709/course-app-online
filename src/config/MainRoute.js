import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './BottomTab';
import { config } from './config';
// import LoadingCpn from "~/components/LoadingCpn";
const Stack = createStackNavigator();
export default function MainRoute() {
  return (
    <Stack.Navigator
      initialRouteName="Homes"
      screenOptions={{
        headerShown: false,
        // gestureEnabled: false,
      }}>
      {config.map(item => (
        <Stack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={item.options}
        />
      ))}
      <Stack.Screen
        name="Homes"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
