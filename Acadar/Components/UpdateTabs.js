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
import Profile from './ProfileComponents/Profile';

const Tab = createBottomTabNavigator();

export default function UpdateTabs() {
  const user = {
  name: 'Jacoby Rigney',
  email: 'amurf26@outlook.com',
  password: '$2b$10$X/b3SW5We.wbHJLUEiiDauKqFWvvFY5mqtEf6wodf8LUuzq4FW5zW',
  'share-pin': '12345',
  private: true,
  grade_level: '12',
  school: 'Thunderbird high school',
  freshman: [],
  sophomore: [
    { name: 'Honors Algebra 2 / Trig', grade: '92' },
    { name: 'French 3-4', grade: '91' },
    { name: 'AP World History', grade: '99' },
    { name: 'AP Comp Sci Princibles', grade: '98' },
    { name: 'Honors Chemistry', grade: '97' }
  ],
  junior: [
    { name: 'AP Calc AB', grade: '96' },
    { name: 'AP Physics', grade: '95' },
    { name: 'English 5-6', grade: '94' },
    { name: 'AP U.S. History', grade: '93' },
    { name: 'AP Comp Sci A', grade: '92' },
    { name: '3D Art', grade: '91' }
  ],
  senior: [
    { name: 'AP Calc BC', grade: '99' },
    { name: 'Econ/Gov', grade: '98' },
    { name: 'AP Literature', grade: '97' },
    { name: 'T.A.for Intro to Coding', grade: '96' }
  ],
  clubs: [ { name: 'Theater', desc: 'Description for Theater' } ],
  work: [
    {
      company: 'Five Guys',
      desc: 'Cooked, cleaned and performed any other required task'
    }
  ],
  communityService: [
    {
      name: 'Bikes For Foster Kids',
      desc: 'Refurbished bikes for foster kids',
      hours: '15'
    }
  ],
  sports: [
    {
      name: 'Basketball',
      desc: 'I was point guard for JV team',
      award: 'National competetor'
    }
  ],
  perfrormingArts: [
    { name: 'Band', desc: 'Played percussion', award: '2nd in region' }
  ],
  __v: 0
}
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} initialParams={{user}} /> 
    </Tab.Navigator>
  );
}