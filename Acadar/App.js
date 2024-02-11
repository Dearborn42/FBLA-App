import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserContent from './Components/UserContent'
import Classes from './Components/Create/Classes';
import Account from './Components/Create/Account';
import UpdateTabs from './Components/UpdateTabs';
import Login from './Components/Login';
import Landing from './Components/Landing';
import CreateForm from './Components/Create/CreateForm';


const Stack = createStackNavigator();

const App = () => {
  const FormComponent = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [createForm, setCreateForm] = useState({
      name: '',
      email: '',
      password: '',
      'share-pin': '',
      private: false,
      grade_level: '',
      school: '',
      freshman: [],
      sophomore: [],
      junior: [],
      senior: [],
      clubs: [],
      communityService: [],
      perfrormingArts: [],
      sports: [],
      work: [],
    });
    const studentSetup = [
      Account,
      Classes,
      {
        "mod":setCurrentIndex,
        setCreateForm,
        createForm,
        userField: "work",
        name: "jobs",
        categories: ["name", "desc"],
        object: { "name": '', "desc": ''},
        placeholders: ["Enter company name", "Enter job description"],
        last: false
      },
      {
        "mod":setCurrentIndex,
        setCreateForm,
        createForm,
        userField: "clubs",
        name: "clubs",
        categories: ["name", "desc"],
        object: { "name": '', "desc": ''},
        placeholders: ['Enter club name', 'Enter club description'],
        last: false
      },
      {
        "mod":setCurrentIndex,
        setCreateForm,
        createForm,
        userField: "sports",
        name: "sports",
        categories: ["name", "desc", "award"],
        object: { "name": '', "desc": '', "award": ''},
        placeholders: ["Enter sport name", "Enter sport experience", "Enter sport highest award/achievment"],
        last: false
      },
      {
        "mod":setCurrentIndex,
        setCreateForm,
        createForm,
        userField: "perfrormingArts",
        name: "arts",
        categories: ["name", "desc", "award"],
        object: { "name": '', "desc": '', "award": ''},
        placeholders: ["Enter art name", "Enter art experience", "Enter highest award/achievment"],
        last: false
      },
      {
        "mod":navigation,
        setCreateForm,
        createForm,
        userField: "communityService",
        name: "services",
        categories: ["name", "desc", "hours"],
        object: { "name": '', "desc": '', "hours": ''},
        placeholders: ["Enter service name", "Enter service experience", "Enter amount of hours"],
        last: true
      }
    ];
    const CurrentForm = studentSetup[currentIndex];
    return currentIndex < 2 ? (
      <CurrentForm mod={setCurrentIndex} data={{createForm, setCreateForm}} />
    ) : (
      <CreateForm data={CurrentForm} />
    );
  };
  return (
      <View style={{ height: '100%', width: '100%' }}>
          <NavigationContainer>
            <UserContent>
              <Stack.Navigator initialRouteName='Landing'>
                <Stack.Screen
                  name='Login'
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='Create'
                  component={FormComponent}
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
            </UserContent>
          </NavigationContainer>
      </View>
  );
};

export default App;
