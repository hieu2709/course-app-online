import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import config from './config';
const Stack = createStackNavigator();
function UserNavigation() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {config.map(item => (
          <Stack.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={item.options}
          />
        ))}
      </Stack.Navigator>
    </>
  );
}

export default UserNavigation;
