import React, { useState, useContext } from 'react';
import { View, ScrollView, Button, StyleSheet,Dimensions,
  ImageBackground,
  TouchableOpacity } from 'react-native';
import ProfileStudent from './ProfileStudent';
import UpdateStudent from "../Update/UpdateStudent"
import ProfileClasses from './ProfileClasses';
import UpdateClasses from '../Update/UpdateClasses';
import ProfileClubs from './ProfileClubs';
import UpdateClubs from '../Update/UpdateClubs';
import ProfileJobs from './ProfileJobs';
import UpdateJobs from '../Update/UpdateJobs';
import ProfileService from './ProfileService';
import UpdateCommunityServce from '../Update/UpdateCommunityService';
import ProfileArt from './ProfileArt';
import UpdateArts from '../Update/UpdateArt';
import ProfileSports from './ProfileSports';
import UpdateSports from '../Update/UpdateSport';

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
            {!clubs ? <ProfileClubs user={user}/> : <UpdateClubs user={user}/>}
            <Button onPress={() => handleClubs()} title="Edit Section"></Button>
            {!jobs ? <ProfileJobs user={user}/> : <UpdateJobs user={user}/>}
            <Button onPress={() => handleJobs()} title="Edit Section"></Button>
            {!community ? <ProfileService user={user}/> : <UpdateCommunityServce user={user}/>}
            <Button onPress={() => handleService()} title="Edit Section"></Button>
            {!art ? <ProfileArt user={user}/> : <UpdateArts user={user}/>}
            <Button onPress={() => handleArt()} title="Edit Section"></Button>
            {!sport ? <ProfileSports user={user}/> : <UpdateSports user={user}/>}
            <Button onPress={() => handleSport()} title="Edit Section"></Button>
        </View>
        </ImageBackground>
      </ScrollView>
      
    )
}

const styles = StyleSheet.create({
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