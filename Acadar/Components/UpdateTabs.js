import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './ProfileComponents/Profile';

const Tab = createBottomTabNavigator();

export default function UpdateTabs() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={Profile}/> 
      </Tab.Navigator>
  );
}