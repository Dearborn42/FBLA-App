import React, { useState, useContext } from 'react';
import { View, ScrollView, Button, StyleSheet,Dimensions,
  ImageBackground,
  TouchableOpacity } from 'react-native';
import ProfileStudent from './ProfileStudent';
import UpdateStudent from "../Update/UpdateStudent"
import ProfileClasses from './ProfileClasses';
import UpdateClasses from '../Update/UpdateClasses';
import Display from './Display';
import UpdateComponent from '../Update/UpdateComponent';

export default function Profile(){
    const [sections, setSections] = useState({
      "art": false,
      "classes": false,
      "clubs": false,
      "community": false,
      "jobs": false,
      "sport": false,
      "base": false
    })
    function handleSection(section) {
      setSections((prev) => {
        return {...prev, [section]: !prev[section]}
      })
    }

    return(
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
      source={{ uri: require('../../assets/blue.png') }}
      style={styles.backgroundImage}>
        <View style={styles.container}>
            {!sections.base ? <ProfileStudent /> : <UpdateStudent />}
            <Button onPress={() => handleSection("base")} title="Edit Section"></Button>
            {!sections.classes ? <ProfileClasses /> : <UpdateClasses />}
            <Button onPress={() => handleSection("classes")} title="Edit Section"></Button>
            {!sections.clubs ? 
              <Display data={{
                  userField: "clubs",
                  componentFields: ["name" ,"desc"],
                  nameCounter: "Club",
                  nameFields: ["Name", "Description"]
                }}
              /> : 
              <UpdateComponent data={{
                  userField:"clubs", 
                  name:"Club", 
                  categories: ["name", "desc"],
                  placeholders:["Club Name", "Club Description"],
                  buttonNames:["Add Club", "Cancel new club"],
                  newFormObj:{"name": "", "desc": ""}
                }}
              />
            }
            <Button onPress={() => handleSection("clubs")} title="Edit Section"></Button>
            {!sections.jobs ? 
              <Display data={{
                userField: "work",
                componentFields: ["name" ,"desc"],
                nameCounter: "Job",
                nameFields: ["Company", "Description"]
              }}
              /> : 
              <UpdateComponent data={{
                userField:"work", 
                name:"Job", 
                categories: ["name", "desc"],
                placeholders:["Job Name", "Job Description"],
                buttonNames:["Add Job", "Cancel new job"],
                newFormObj:{"name": "", "desc": ""}
              }}
              />
            }
            <Button onPress={() => handleSection("jobs")} title="Edit Section"></Button>
            {!sections.community ? 
              <Display data={{
                  userField: "communityService",
                  componentFields: ["name" ,"desc", "hours"],
                  nameCounter: "Service",
                  nameFields: ["Name", "Description", "Hours"]
                }}
              /> : 
              <UpdateComponent data={{
                  userField:"communityService", 
                  name:"Service", 
                  categories: ["name", "desc", "hours"],
                  placeholders:["Service Name", "Service Description", "Service hours"],
                  buttonNames:["Add Service", "Cancel new service"],
                  newFormObj:{"name": "", "desc": "", "hours": ""}
                }}
              />
            }
            <Button onPress={() => handleSection("community")} title="Edit Section"></Button>
            {!sections.art ? 
              <Display data={{
                  userField: "perfrormingArts",
                  componentFields: ["name" ,"desc", "award"],
                  nameCounter: "Art",
                  nameFields: ["Name", "Description", "Award"]
                }}
              /> : 
              <UpdateComponent data={{
                  userField:"perfrormingArts", 
                  name:"Art", 
                  categories: ["name", "desc", "award"],
                  placeholders:["Art Name", "Art Description", "Art award/highest achievment"],
                  buttonNames:["Add Art", "Cancel new art"],
                  newFormObj:{"name": "", "desc": "", "award": ""}
                }}
              />
            }
            <Button onPress={() => handleSection("art")} title="Edit Section"></Button>
            {!sections.sport ? 
              <Display data={{
                  userField: "sports",
                  componentFields: ["name" ,"desc", "award"],
                  nameCounter: "Sport",
                  nameFields: ["Name", "Description", "Award"]
                }}
              /> : 
              <UpdateComponent data={{
                  userField:"sports", 
                  name:"Sport", 
                  categories: ["name", "desc", "award"],
                  placeholders:["Sport Name", "Sport Description", "Sport award/highest achievment"],
                  buttonNames:["Add Sport", "Cancel new sport"],
                  newFormObj:{"name": "", "desc": "", "award": ""}
                }}
              />
            }
            <Button onPress={() => handleSection("sport")} title="Edit Section"></Button>
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