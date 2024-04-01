import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native'
import { Drawer } from 'expo-router/drawer';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tabs.Screen
        name="Share"
        options={{
          title: 'Share',
          headerShown: false,
          tabBarIcon: () => <Text>Share</Text>,
        }}
      />
      <Tabs.Screen
        name="Setting"
        options={{
          title: 'Setting',
          headerShown: false,
          tabBarIcon: () => <Text>Settings</Text>,
        }}
      />
      <Tabs.Screen
        name="(drawer)/Profile-base"
        options={{
          title: '(drawer)/Profile-base',
          headerShown: false,
          tabBarIcon: () => <Text>Profile</Text>,
        }}
      />
    </Tabs>
  );
}