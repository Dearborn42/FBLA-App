import React, { useState, useContext } from 'react';
import { View, ScrollView, Button, StyleSheet,Dimensions,
  ImageBackground,
  TouchableOpacity } from 'react-native';
import ProfileStudent from './ProfileStudent';
import UpdateStudent from "../Update/UpdateStudent"
import ProfileClasses from './ProfileClasses';
import UpdateClasses from '../Update/UpdateClasses';
import ProfileClubs from './ProfileClubs';
import ProfileJobs from './ProfileJobs';
import ProfileService from './ProfileService';
import ProfileArt from './ProfileArt';
import ProfileSports from './ProfileSports';
import UpdateTwo from '../Update/UpdateTwo';
import UpdateThree from '../Update/UpdateThree';

export default function Profile({route}){
    const { user } = route.params;
    const [art, setArt] = useState(false)
    const [classes, setClasses] = useState(false)
    const [clubs, setClubs] = useState(false)
    const [community, setCommunity] = useState(false)
    const [jobs, setJobs] = useState(false)
    const [sport, setSport] = useState(false)
    const [base, setBase] = useState(false)

    const handleArt = () => setArt((prev) => !prev)
    const handleClasses = () => setClasses((prev) => !prev)
    const handleClubs = () => setClubs((prev) => !prev)
    const handleService = () => setCommunity((prev) => !prev)
    const handleJobs= () => setJobs((prev) => !prev)
    const handleSport = () => setSport((prev) => !prev)
    const handleBase = () => setBase((prev) => !prev)

    return(
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
      source={{ uri: require('../../assets/blue.png') }}
      style={styles.backgroundImage}>
        <View style={styles.container}>
            {!base ? <ProfileStudent user={user}/> : <UpdateStudent user={user}/>}
            <Button onPress={() => handleBase()} title="Edit Section"></Button>
            {!classes ? <ProfileClasses user={user}/> : <UpdateClasses user={user}/>}
            <Button onPress={() => handleClasses()} title="Edit Section"></Button>
            {!clubs ? 
              <ProfileClubs user={user}/> : 
              <UpdateTwo 
                user={user}
                userField={"clubs"}
                categories={["name", "desc"]}
                placeholders={["Club Name", "Club Description"]}
                buttonNames={["Add Club", "Cancel new club"]}
              />
            }
            <Button onPress={() => handleClubs()} title="Edit Section"></Button>
            {!jobs ? 
              <ProfileJobs user={user}/> : 
              <UpdateTwo
                user={user}
                userField={"work"}
                categories={["name", "desc"]}
                placeholders={["Job Name", "Job Description"]}
                buttonNames={["Add Job", "Cancel new job"]}
              />
            }
            <Button onPress={() => handleJobs()} title="Edit Section"></Button>
            {!community ? 
              <ProfileService user={user}/> : 
              <UpdateThree 
                user={user}
                userField={"communityService"}
                categories={["name", "desc", "hours"]}
                placeholders={["Service Name", "Service Description", "Service hours"]}
                buttonNames={["Add Service", "Cancel new service"]}
              />
            }
            <Button onPress={() => handleService()} title="Edit Section"></Button>
            {!art ? 
              <ProfileArt user={user}/> : 
              <UpdateThree 
                user={user}
                userField={"perfrormingArts"}
                categories={["name", "desc", "award"]}
                placeholders={["Art Name", "Art Description", "Art award/highest achievment"]}
                buttonNames={["Add Art", "Cancel new art"]}
              />
            }
            <Button onPress={() => handleArt()} title="Edit Section"></Button>
            {!sport ? 
              <ProfileSports user={user}/> : 
              <UpdateThree 
                user={user}
                userField={"sports"}
                categories={["name", "desc", "hours"]}
                placeholders={["Sport Name", "Sport Description", "Sport award/highest achievment"]}
                buttonNames={["Add Sport", "Cancel new sport"]}
              />
            }
            <Button onPress={() => handleSport()} title="Edit Section"></Button>
        </View>
        </ImageBackground>
      </ScrollView>
      
    )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  classContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'none',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'none',
  },
  header: {
    color: 'black',
    fontFamily: 'ARCO',
    fontSize: '2rem',
    textAlign: 'center',
  },
  input: {
    width: Dimensions.get('window').width * 0.6,
    height: '2rem',
    color: 'black',
    fontFamily: 'ARCO',
    fontSize: '.75rem',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: '2rem',
    marginBottom: 20,
  },
  text: {
    color: 'black',
    fontFamily: 'ARCO',
    fontSize: '1rem',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  bText: {
    fontFamily: 'ARCO',
    fontSize: '.75rem',
    color: 'black',
  },
  button: {
    backgroundColor: 'white',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '2rem',
    padding: '.5rem',
    marginBottom: '1rem',
  },
});