import React, { useState } from 'react';
import { View, ScrollView, Button, StyleSheet,Dimensions,
  ImageBackground} from 'react-native';
import ProfileStudent from '../../Components/ProfileComponents/ProfileStudent';
import UpdateStudent from "../../Components/Update/UpdateStudent"
import ProfileClasses from '../../Components/ProfileComponents/ProfileClasses';
import UpdateClasses from '../../Components/Update/UpdateClasses';
import Display from '../../Components/ProfileComponents/Display';
import UpdateComponent from '../../Components/Update/UpdateComponent';

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