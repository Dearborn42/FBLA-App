import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../../app/_layout';

export default function UpdateClasses() {
    const {currentUser} = useContext(UserContext)
    const [newForm, setNewForm] = useState(false);
    const [newClub, setNewClub] = useState({"name": '', "grade": ''});
    const [field, setField] = useState("");
    const [value, setValue] = useState("");
    const [year, setYear] = useState("");

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
        if(year != ""){
            var body1 = await fetch(`http://localhost:5000/functions/add/${year}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(newClub)
            });
            var body1_response = await body1.json();
            if (body1_response.success){
                setYear("");
                console.log("Yippe")
            }
        }
    };

    const removeClass = async (year, name) => {
        var body1 = await fetch(`http://localhost:5000/functions/remove/${year}/${name}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            console.log("Yippe")
        }
    };

    const updateClass = async (year, name) => {
        if(value.trim() === "") return;
        var body1 = await fetch(`http://localhost:5000/functions/update/${year}/${name}/${field}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
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
          <Text style={styles.header}>{year.charAt(0).toUpperCase() + year.slice(1)}</Text>
          {currentUser[year].map((classItem, index) => (
            <View key={index} style={styles.classContainer}>
              <Text>Class {index + 1}</Text>
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
              <Button title="Remove" onPress={() => removeClass(year, classItem.name)} />
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
        <Button 
            title="Submit"
            onPress={addClass}
        />
        </View>
    )}
    {!newForm ? (
        <Button title={`Add Class`} onPress={handleForm} />
    ) : (
        <Button title={`Cancel Class`} onPress={handleForm} />
    )}
    </View>
    </ScrollView>
  );
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

