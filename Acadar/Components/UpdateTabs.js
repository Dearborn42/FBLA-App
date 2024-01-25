import React, { useContext } from 'react';
import UserContext from './UserContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './ProfileComponents/Profile';

const Tab = createBottomTabNavigator();

export default function UpdateTabs() {
   const { user } = useContext(UserContext);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} initialParams={{user}} /> 
    </Tab.Navigator>
  );
}