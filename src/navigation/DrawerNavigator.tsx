import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from './screens/DashboardScreen';
import SensorsScreen from './screens/SensorsScreen';
import DevicesScreen from './screens/DevicesScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawerContent from './CustomDrawerContent';
import { colors } from '../theme';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: colors.text,
        drawerInactiveTintColor: colors.textMuted,
        drawerActiveBackgroundColor: colors.surfaceMuted,
        drawerStyle: {
          backgroundColor: colors.background,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
        },
      }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}>

      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerIcon: ({ size }) => (
            <Ionicons
              name="grid-outline"
              size={size}
              color={colors.text}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Sensors"
        component={SensorsScreen}
        options={{
          drawerIcon: ({ size }) => (
            <Ionicons
              name="analytics-outline"
              size={size}
              color={colors.text}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Devices"
        component={DevicesScreen}
        options={{
          drawerIcon: ({ size }) => (
            <Ionicons
              name="hardware-chip-outline"
              size={size}
              color={colors.text}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={colors.text}
            />
          ),
        }}
      />

    </Drawer.Navigator>
  );
}