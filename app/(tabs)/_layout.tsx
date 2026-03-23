import { Tabs } from 'expo-router';
import React from 'react';
import CustomTabBar from '../../components/CustomTabBar';
import i18n from '../../translation';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.t("home"),
        }}
      />
      <Tabs.Screen
        name="mileage"
        options={{
          title: i18n.t("mileage"),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: i18n.t("settings"),
        }}
      />
    </Tabs>
  );
}
