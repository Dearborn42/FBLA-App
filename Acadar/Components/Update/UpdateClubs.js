import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


export default function UpdateClubs({user}){
    const [form, setForm] = useState({clubs: user.clubs});
    const [newClub, setNewClub] = useState({"name": '', "desc": ''});
    const [field, setField] = useState("");
    const [value, setValue] = useState("");

    var handleValue = (text) => setValue(text);
    var handleField = (textValue) => setField(textValue);
    var handleNewClub = (field, value) => setNewClub({[field]: value});

    const addClub = async() => {
        var body1 = await fetch(`http://localhost:5000/clubs/add`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(newClub)
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };

    const removeClub = async (name) => {
        var body1 = await fetch(`http://localhost:5000/clubs/remove/${name}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };
    const updateClub = async (name) => {
        var body1 = await fetch(`http://localhost:5000/clubs/update/${name}/${field}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(newClub)
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Enter your clubs</Text>
        <View>
        {form.clubs.map((club, index ) => (
            <View key={index} style={styles.classContainer}>
              <Text>Club {index + 1}</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleValue(text)}
                placeholder={club.name}
                required
                id={"name"}
                name={"name"}
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleValue(text)}
                placeholder={club.desc}
                required
                id={"desc"}
                name={"desc"}
              />
              <Button title="Remove" onPress={() => removeClub(club.name)} />
            </View>
        ))}
            <Button title={`Add Club`} onPress={() => addClub()} />
        </View>
    </View> 
  )
}

const styles = StyleSheet.create({
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
