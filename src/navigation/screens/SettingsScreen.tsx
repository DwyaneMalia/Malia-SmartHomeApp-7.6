import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

export default function SettingsScreen() {

  const [notifications, setNotifications] = useState(true);
  const [autoConnect, setAutoConnect] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  return (
    <ScrollView style={styles.container}>

      {/* Header */}

      <Text style={styles.title}>
        Settings
      </Text>

      <Text style={styles.subtitle}>
        Configure your IoT application
      </Text>


      {/* General Settings */}

      <Text style={styles.sectionTitle}>
        General
      </Text>


      {/* Notifications */}

      <View style={styles.settingCard}>

        <View style={styles.settingInfo}>

          <Ionicons
            name="notifications-outline"
            size={26}
          />

          <View style={styles.settingText}>

            <Text style={styles.settingName}>
              Notifications
            </Text>

            <Text style={styles.settingDescription}>
              Receive alerts from your IoT devices
            </Text>

          </View>

        </View>

        <Switch
          value={notifications}
          trackColor={{ false: colors.border, true: colors.textMuted }}
          thumbColor={colors.textOnDark}
          onValueChange={setNotifications}
        />

      </View>

      {/* Sound Effects */}

      <View style={styles.settingCard}>

        <View style={styles.settingInfo}>

          <Ionicons
            name="volume-high-outline"
            size={26}
          />    

        <View style={styles.settingText}>

            <Text style={styles.settingName}>
              Sound Effects
            </Text>

            <Text style={styles.settingDescription}>
              Play sound effects for device events
            </Text>

          </View>

        </View>

        <Switch
          value={soundEffects}
          trackColor={{ false: colors.border, true: colors.textMuted }}
          thumbColor={colors.textOnDark}
          onValueChange={setSoundEffects}
        />

      </View>

      {/* Auto Connect */}

      <View style={styles.settingCard}>

        <View style={styles.settingInfo}>

          <Ionicons
            name="wifi-outline"
            size={26}
          />

          <View style={styles.settingText}>

            <Text style={styles.settingName}>
              Auto Connect
            </Text>

            <Text style={styles.settingDescription}>
              Automatically connect to the IoT gateway
            </Text>

          </View>

        </View>

        <Switch
          value={autoConnect}
          trackColor={{ false: colors.border, true: colors.textMuted }}
          thumbColor={colors.textOnDark}
          onValueChange={setAutoConnect}
        />

      </View>


      {/* Dark Mode */}

      <View style={styles.settingCard}>

        <View style={styles.settingInfo}>

          <Ionicons
            name="moon-outline"
            size={26}
          />

          <View style={styles.settingText}>

            <Text style={styles.settingName}>
              Dark Mode
            </Text>

            <Text style={styles.settingDescription}>
              Darker application appearance
            </Text>

          </View>

        </View>

        <Switch
          value={darkMode}
          trackColor={{ false: colors.border, true: colors.textMuted }}
          thumbColor={colors.textOnDark}
          onValueChange={setDarkMode}
        />

      </View>


      {/* Connection */}

      <Text style={styles.sectionTitle}>
        Connection
      </Text>


      <View style={styles.connectionCard}>

        <View style={styles.connectionInfo}>

          <Ionicons
            name="cloud-done-outline"
            size={30}
          />

          <View>

            <Text style={styles.connectionTitle}>
              IoT Gateway
            </Text>

            <Text style={styles.connectionStatus}>
              Connected
            </Text>

          </View>

        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 25,
    color: colors.textMuted,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 10,
    color: colors.text,
  },

  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 15,
    backgroundColor: colors.surface,
    marginBottom: 12,
  },

  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  settingText: {
    marginLeft: 15,
    flex: 1,
  },

  settingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },

  settingDescription: {
    fontSize: 12,
    marginTop: 4,
    color: colors.textMuted,
  },

  connectionCard: {
    padding: 18,
    borderRadius: 15,
    backgroundColor: colors.surface,
  },

  connectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  connectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    color: colors.text,
  },

  connectionStatus: {
    fontSize: 13,
    marginLeft: 15,
    marginTop: 3,
    color: colors.text,
  },

});
