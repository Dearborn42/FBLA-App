import React, { useContext } from 'react';
import UserContext from './UserContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UpdateStudent from './Update/UpdateStudent';
import UpdateClubs from './Update/UpdateClubs';
import UpdateJobs from './Update/UpdateJobs';
import UpdateCommunityServce from './Update/UpdateCommunityService';
import UpdateSports from './Update/UpdateSport';
import UpdateArts from './Update/UpdateArt';
import UpdateClasses from './Update/UpdateClasses';

const Tab = createBottomTabNavigator();

export default function UpdateTabs() {
  const { user } = useContext(UserContext);
  return (
    <Tab.Navigator>
      <Tab.Screen name="student" component={UpdateStudent} initialParams={{ user }} />
      <Tab.Screen name="classes" component={UpdateClasses} initialParams={{ user }} />
      <Tab.Screen name="clubs" component={UpdateClubs} initialParams={{ user }} />
      <Tab.Screen name="work" component={UpdateJobs} initialParams={{ user }} />
      <Tab.Screen name="sports" component={UpdateSports} initialParams={{ user }} />
      <Tab.Screen name="arts" component={UpdateArts} initialParams={{ user }} />
      <Tab.Screen name="community" component={UpdateCommunityServce} initialParams={{ user }} />
    </Tab.Navigator>
  );
}