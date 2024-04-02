import React from 'react';
import { Link } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import blimpy from "../assets/blimpy.png"


const Page = () => {
    return (
      <ImageBackground
            style={styles.container}
            source={ require('../assets/Lando.png') }>
        <View style={styles.container}>
        <Text style={styles.text}>Welcome to Acadar!</Text>
        <Text style={styles.text2}>We put you on the academic radar</Text>
        <Image
            style={styles.image2}
            source={blimpy}></Image>
        <Link 
                activeOpacity={0.7}
                style={{...styles.button, ...styles.bText}}
                href="/Create"
            >
                Sign up
            </Link>
            <Link 
                activeOpacity={0.7}
                style={{...styles.button2, ...styles.bText}}
                href="/Login"
            >
                Login
            </Link>
        </View>
        </ImageBackground>
    );
//   const FormComponent = ({ navigation }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [createForm, setCreateForm] = useState({
//       name: '',
//       email: '',
//       password: '',
//       'share-pin': '',
//       private: false,
//       grade_level: '',
//       school: '',
//       freshman: [],
//       sophomore: [],
//       junior: [],
//       senior: [],
//       clubs: [],
//       communityService: [],
//       perfrormingArts: [],
//       sports: [],
//       work: [],
//     });
//     const studentSetup = [
//       Account,
//       Classes,
//       {
//         "mod":setCurrentIndex,
//         setCreateForm,
//         createForm,
//         userField: "work",
//         name: "jobs",
//         categories: ["name", "desc"],
//         object: { "name": '', "desc": ''},
//         placeholders: ["Enter company name", "Enter job description"],
//         last: false
//       },
//       {
//         "mod":setCurrentIndex,
//         setCreateForm,
//         createForm,
//         userField: "clubs",
//         name: "clubs",
//         categories: ["name", "desc"],
//         object: { "name": '', "desc": ''},
//         placeholders: ['Enter club name', 'Enter club description'],
//         last: false
//       },
//       {
//         "mod":setCurrentIndex,
//         setCreateForm,
//         createForm,
//         userField: "sports",
//         name: "sports",
//         categories: ["name", "desc", "award"],
//         object: { "name": '', "desc": '', "award": ''},
//         placeholders: ["Enter sport name", "Enter sport experience", "Enter sport highest award/achievment"],
//         last: false
//       },
//       {
//         "mod":setCurrentIndex,
//         setCreateForm,
//         createForm,
//         userField: "perfrormingArts",
//         name: "arts",
//         categories: ["name", "desc", "award"],
//         object: { "name": '', "desc": '', "award": ''},
//         placeholders: ["Enter art name", "Enter art experience", "Enter highest award/achievment"],
//         last: false
//       },
//       {
//         "mod":navigation,
//         setCreateForm,
//         createForm,
//         userField: "communityService",
//         name: "services",
//         categories: ["name", "desc", "hours"],
//         object: { "name": '', "desc": '', "hours": ''},
//         placeholders: ["Enter service name", "Enter service experience", "Enter amount of hours"],
//         last: true
//       }
//     ];
//     const CurrentForm = studentSetup[currentIndex];
//     return currentIndex < 2 ? (
//       <CurrentForm mod={setCurrentIndex} data={{createForm, setCreateForm}} />
//     ) : (
//       <CreateForm data={CurrentForm} />
//     );
//   };
//   return (
//       <View style={{ height: '100%', width: '100%' }}>
//         <UserContent>
//             <Stack.Navigator initialRouteName='Landing'>
//             <Stack.Screen
//                 name='Login'
//                 component={Login}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name='Create'
//                 component={FormComponent}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name='App'
//                 component={UpdateTabs}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name='Landing'
//                 component={Landing}
//                 options={{ headerShown: false }}
//             />
//             </Stack.Navigator>
//         </UserContent>
//       </View>
//   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image2: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.4,
    resizeMode: 'contain',
    position: 'absolute',
    top: Dimensions.get('window').height * 0.6,
    left: Dimensions.get('window').width * 0.1,
    marginTop:-Dimensions.get('window').height * 0.2,
    zIndex: -1,
  },
  text: {
    backgroundColor: 'transparent',
    // fontFamily: 'ARCO',
    fontSize: 24,
    margin:16,
    textAlign: 'center',
  },
  text2: {
    backgroundColor: 'transparent',
    // fontFamily: 'ARCO',
    fontSize: 12.8,
    textAlign: 'center',
  },
  bText: {
    // fontFamily: 'ARCO',
    fontSize: 16,
    color: 'white',
  },
  button: {
    color: 'black',
    backgroundColor: '#c42430',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.05,
    position: 'absolute',
    top: Dimensions.get('window').height * 0.55,
    left: Dimensions.get('window').width * 0.5,
    marginLeft: -Dimensions.get('window').width * 0.3,
    marginTop: -Dimensions.get('window').height * 0.025,
    borderRadius: 32,
  },
  button2: {
    color: 'black',
    backgroundColor: '#c42430',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.05,
    position: 'absolute',
    top: Dimensions.get('window').height * 0.625,
    left: Dimensions.get('window').width * 0.5,
    marginLeft: -Dimensions.get('window').width * 0.3,
    marginTop: -Dimensions.get('window').height * 0.025,
    borderRadius: 32,
  },
});

export default Page;
