import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import { UserContext } from '../../app/_layout';
import * as SecureStore from 'expo-secure-store';
import {useFonts} from "expo-font"
export default function UpdateClasses() {
  const [loaded] = useFonts({
      MontHeavyDemo: require("../../assets/fonts/HWYGOTH.ttf")
    })
    if(!loaded){
      return null
    }
    const {currentUser, updateCurrentUser, reset, setReset} = useContext(UserContext)
    const [newForm, setNewForm] = useState(false);
    const [newClub, setNewClub] = useState({"name": '', "grade": ''});
    const [field, setField] = useState("");
    const [value, setValue] = useState("");
    const [year, setYear] = useState("");
    useEffect(() => {
      setReset(false);
    }, [reset])
    
    var handleValue = (text) => setValue(text);
    var handleField = (textValue) => setField(textValue);
    var handleNewClub = (field, value) => setNewClub((prev) => {return {...prev, ...{[field]: value}}});
    var handleForm = () => {
        setNewClub({"name": '', "grade": ''})
        setNewForm((prev) => !prev);
    };
    var handleYear = (text) => {
        text = text.toLowerCase();
        if(text === "senior" || text === "junior" || text === "freshman" || text === "sophomore")
            setYear(text);
    }

    const addClass = async() => {
        const token = await SecureStore.getItemAsync("authToken");
        if(!token) return;
        if(year != ""){
            var body1 = await fetch(`http://172.233.131.223:5000/functions/add/${year}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", "auth": token },
                body: JSON.stringify(newClub)
            });
            var body1_response = await body1.json();
            if (body1_response.success){
              updateCurrentUser(year, newClub, 0, "add");
              setYear("");
              setReset(true);
            }
        }
    };

    const removeClass = async (year, name) => {
        const token = await SecureStore.getItemAsync("authToken");
        if(!token) return;
        var body1 = await fetch(`http://172.233.131.223:5000/functions/remove/${year}/${name}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json", "auth": token },
        });
        var body1_response = await body1.json();
        if (body1_response.success){
          updateCurrentUser(year, name, 0, "remove");
              setReset(true);
        }
    };

    const updateClass = async (year, name) => {
        const token = await SecureStore.getItemAsync("authToken");
        if(!token) return;
        if(value.trim() === "") return;
        var body1 = await fetch(`http://172.233.131.223:5000/functions/update/${year}/${name}/${field}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json", "auth": token },
            body: JSON.stringify({"value": value})
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {['freshman', 'sophomore', 'junior', 'senior'].map((year) => (
        <View key={year}>
          <Text style={{...styles.header, fontFamily: 'MontHeavyDemo',}}>{year.charAt(0).toUpperCase() + year.slice(1)}</Text>
          {currentUser[year].map((classItem, index) => (
            <View key={index} style={styles.classContainer}>
              <Text style={styles.text}>Class {index + 1}</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {handleValue(text); handleField("name")}}
                onBlur={() => updateClass(year, classItem.name)}
                placeholder={classItem.name}
                id={year+"_className"}
                name={year+"_className"}
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => {handleValue(text); handleField("grade")}}
                onBlur={() => updateClass(year, classItem.name)}
                placeholder={classItem.grade}
                keyboardType="numeric"
                required
                id={year+"_classGrade"}
                name={year+"_classGrade"}
              />
              <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.button}
                      onPress={() => removeClass(year, classItem.name)}>
                      <Text style={styles.bText}>Remove</Text>
                    </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
      {newForm && (
        <View>
        <TextInput 
            style={styles.input} 
            type="text" 
            placeholder="Year (Freshman, sophomore...)"
            onChangeText={(text) => handleYear(text)}
            id={"year"}
            name={"year"} 
        />
        <TextInput 
            style={styles.input} 
            type="text" 
            placeholder="Class Name"
            onChangeText={(text) => handleNewClub("name", text)}
            id={"name"}
            name={"name"} 
        />
        <TextInput 
            style={styles.input} 
            type="text" 
            placeholder="Class Grade"
            onChangeText={(text) => handleNewClub("grade", text)}
            id={"grade"}
            name={"grade"}  
        />
        <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.button}
                      onPress={addClass}>
                      <Text style={styles.bText}>Submit</Text>
                    </TouchableOpacity>
        </View>
    )}
    {!newForm ? (
        <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.button}
                      onPress={handleForm}>
                      <Text style={styles.bText}>Add Class</Text>
                    </TouchableOpacity>
    ) : (
        <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.button}
                      onPress={handleForm}>
                      <Text style={styles.bText}>Cancel Class</Text>
                    </TouchableOpacity>
    )}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  bText: {
    // fontFamily: 'ARCO',
    fontSize: 20,
    color: 'black',
    fontFamily: 'MontHeavyDemo',

  },
  button: {
    fontFamily: 'MontHeavyDemo',
    
    backgroundColor: 'white',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 16,
  },
  container: {
    
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 32,
  },
  header: {
    fontSize: 32,
    marginBottom: 0,
    fontFamily: 'MontHeavyDemo',
  },
  text: {
    color: 'black',
    fontFamily: 'MontHeavyDemo',
    fontSize: 20,
  },
  input: {
    width: "100%",
    height: 40,
    color: 'black',
    fontFamily: 'MontHeavyDemo',
    fontSize: 14,
    backgroundColor: 'white',
    padding: 10,
    borderStyle:"solid",
    borderWidth:1,
    borderColor:"black",
    marginBottom: 8,
    borderRadius: 32,
  },
});

