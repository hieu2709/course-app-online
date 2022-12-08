import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainRoute from '~/config/MainRoute';

const queryClient = new QueryClient();
const rootStack = createStackNavigator();
function MainNavigator() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <rootStack.Navigator>
          <rootStack.Screen
            name="Route"
            component={MainRoute}
            options={{
              headerShown: false,
            }}
          />
        </rootStack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
export default MainNavigator;
