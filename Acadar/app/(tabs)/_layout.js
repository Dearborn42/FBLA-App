import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native'
import { Drawer } from 'expo-router/drawer';
import { Entypo,FontAwesome,Feather } from '@expo/vector-icons';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tabs.Screen
        name="Share"
        options={{
          title: 'Share',
          headerShown: false,
          tabBarIcon: () => <Text><Entypo name="share" size={24} color="black" /></Text>,
        }}
      />
      <Tabs.Screen
        name="Setting"
        options={{
          title: 'Setting',
          headerShown: false,
          tabBarIcon: () => <Text><FontAwesome name="cog" size={24} color="black" /></Text>,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: () => <Text><Feather name="user" size={24} color="black" /></Text>,
        }}
      />
    </Tabs>
  );
}