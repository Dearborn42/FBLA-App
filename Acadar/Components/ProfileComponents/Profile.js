import React, { useState, useContext } from 'react';
import { View, ScrollView, Button, StyleSheet} from 'react-native';
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
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});