import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { IoTProvider } from './src/navigation/context/IoTContext';
import { navigationTheme } from './src/theme';

export default function App() {
  return (
    <IoTProvider>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style="dark" />
        <DrawerNavigator />
      </NavigationContainer>
    </IoTProvider>
  );
}
