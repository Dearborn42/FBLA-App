import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserContext from './Components/UserContext';
import Classes from './Components/Create/Classes';
import Account from './Components/Create/Account';
import Clubs from './Components/Create/Clubs';
import Work from './Components/Create/Work';
import Sports from './Components/Create/Sports';
import PerformingArts from './Components/Create/PerformingArts';
import CommunityService from './Components/Create/CommunityService';
import UpdateTabs from './Components/UpdateTabs';
import Login from './Components/Login';
import Landing from './Components/Landing';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const studentSetup = [
    Account,
    Classes,
    Clubs,
    Work,
    Sports,
    PerformingArts,
    CommunityService,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prev, setPrev] = useState({});
  const CurrentForm = studentSetup[currentIndex];
  const FormComponent = ({ navigation }) => {
    return currentIndex !== studentSetup.length - 1 ? (
      <CurrentForm mod={setCurrentIndex} data={setPrev} />
    ) : (
      <CurrentForm data={prev} navigation={navigation} />
    );
  };
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Create'>
            <Stack.Screen
              name='Login'
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Create'
              component={Classes}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='App'
              component={UpdateTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Landing'
              component={Landing}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </View>
  );
};

export default App;
