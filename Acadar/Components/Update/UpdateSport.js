import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';


export default function UpdateSports({user}){
    const [newForm, setNewForm] = useState(false);
    const [form, setForm] = useState({sports: user.sports});
    const [sport, setSport] = useState({"name": '', "desc": '', "award": ""});
    const [field, setField] = useState("");
    const [value, setValue] = useState("");

    var handleValue = (text) => setValue(text);
    var handleField = (textValue) => setField(textValue);
    var handleNewService = (field, value) => setSport((prev) => {return {...prev, ...{[field]: value}}});
    var handleForm = () => {
        setSport({"name": '', "desc": '', "award": ""})
        setNewForm((prev) => !prev);
    };

    const addService = async() => {
        var body1 = await fetch(`http://172.233.131.223:5000/update/sports`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(sport)
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };

    const removeService = async (name) => {
        var body1 = await fetch(`http://172.233.131.223:5000/update/sports/${name}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };
    const updateService = async (name) => {
        if(value.trim() === "") return;
        var body1 = await fetch(`http://172.233.131.223:5000/sports/update/${name}/${field}`, {
            method: 'POST',
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
        <View>
        {form.sports.map((sport, index ) => (
            <View key={index} style={styles.classContainer}>
              <Text>Sport {index + 1}</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {handleValue(text); handleField("name")}}
                onBlur={() => updateService(sport.name)}
                placeholder={sport.name}
                required
                id={"name"}
                name={"name"}
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => {handleValue(text); handleField("desc")}}
                onBlur={() => updateService(sport.name)}
                placeholder={sport.desc}
                required
                id={"desc"}
                name={"desc"}
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => {handleValue(text); handleField("award")}}
                onBlur={() => updateService(sport.name)}
                placeholder={sport.award}
                required
                id={"hours"}
                name={"hours"}
              />
              <Button title="Remove" onPress={() => removeService(sport.name)} />
            </View>
        ))} 
            {newForm && (
                <View>
                <TextInput 
                    style={styles.input} 
                    type="text" 
                    placeholder="Sport Name"
                    onChangeText={(text) => handleNewService("name", text)}
                    id={"name"}
                    name={"name"} 
                />
                <TextInput 
                    style={styles.input} 
                    type="text" 
                    placeholder="Sport Description"
                    onChangeText={(text) => handleNewService("desc", text)}
                    id={"desc"}
                    name={"desc"}  
                />
                <TextInput 
                    style={styles.input} 
                    type="text" 
                    placeholder="Sport award/highest achievment"
                    onChangeText={(text) => handleNewService("award", text)}
                    id={"award"}
                    name={"award"}  
                />
                <Button 
                    title="Submit"
                    onPress={addService}
                />
                </View>
            )}
            {!newForm ? (
                <Button title={`Add Sport`} onPress={handleForm} />
            ) : (
                <Button title={`Cancel Sport`} onPress={handleForm} />
            )}
        </View>
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
