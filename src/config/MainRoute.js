import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './BottomTab';
import { config, noLogin } from './config';
import useUser from '~/hooks/useUser';
import MyLoadingFull from '~/base/components/MyLoadingFull';
// import LoadingCpn from "~/components/LoadingCpn";
const Stack = createStackNavigator();
export default function MainRoute() {
  const { user: isLogin } = useUser();
  console.log(isLogin);
  if (isLogin == null) {
    return <MyLoadingFull text={'Loading...'} />;
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // gestureEnabled: false,
        }}>
        {!isLogin &&
          noLogin.map(item => (
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
        {isLogin &&
          config.map(item => (
            <Stack.Screen
              key={item.name}
              name={item.name}
              component={item.component}
              options={item.options}
            />
          ))}
      </Stack.Navigator>
    );
  }
}
