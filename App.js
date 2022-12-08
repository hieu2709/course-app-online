import React from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Sending']);
import MainNavigator from '~/MainNavigator';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from '~/redux/store';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from '~/ThemeProvider';

export default function App() {
  const [fontsLoaded] = useFonts({
    qs_300: require('~/assets/Quicksand-Light.ttf'),
    qs_400: require('~/assets/Quicksand-Regular.ttf'),
    qs_500: require('~/assets/Quicksand-Medium.ttf'),
    qs_600: require('~/assets/Quicksand-SemiBold.ttf'),
    qs_700: require('~/assets/Quicksand-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <RootSiblingParent>
        <ThemeProvider>
          <SafeAreaProvider>
            <Provider store={store}>
              <MenuProvider>
                <MainNavigator />
              </MenuProvider>
            </Provider>
          </SafeAreaProvider>
        </ThemeProvider>
      </RootSiblingParent>
    );
  }
}
