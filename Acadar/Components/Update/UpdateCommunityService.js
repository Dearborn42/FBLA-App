import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';


export default function UpdateCommunityServce({user}){
    const [newForm, setNewForm] = useState(false);
    const [newService, setNewService] = useState({"name": '', "desc": '', "hours": ""});
    const [field, setField] = useState("");
    const [value, setValue] = useState("");

    var handleValue = (text) => setValue(text);
    var handleField = (textValue) => setField(textValue);
    var handleNewService = (field, value) => setNewService((prev) => {return {...prev, ...{[field]: value}}});
    var handleForm = () => {
        setNewService({"name": '', "desc": '', "hours": ""})
        setNewForm((prev) => !prev);
    };

    const addService = async() => {
        var body1 = await fetch(`http://localhost:5000/functions/add/communityService`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(newService)
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };

    const removeService = async (name) => {
        var body1 = await fetch(`http://localhost:5000/functions/remove/communityService/${name}`, {
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
        var body1 = await fetch(`http://localhost:5000/functions/update/communityService/${name}/${field}`, {
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
        {user.communityService.map((service, index ) => (
            <View key={index} style={styles.classContainer}>
              <Text>Service {index + 1}</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {handleValue(text); handleField("name")}}
                onBlur={() => updateService(service.name)}
                placeholder={service.name}
                required
                id={"name"}
                name={"name"}
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => {handleValue(text); handleField("desc")}}
                onBlur={() => updateService(service.name)}
                placeholder={service.desc}
                required
                id={"desc"}
                name={"desc"}
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => {handleValue(text); handleField("hours")}}
                onBlur={() => updateService(service.name)}
                placeholder={service.hours}
                required
                id={"hours"}
                name={"hours"}
              />
              <Button title="Remove" onPress={() => removeService(service.name)} />
            </View>
        ))} 
            {newForm && (
                <View>
                <TextInput 
                    style={styles.input} 
                    type="text" 
                    placeholder="Service Name"
                    onChangeText={(text) => handleNewService("name", text)}
                    id={"company"}
                    name={"company"} 
                />
                <TextInput 
                    style={styles.input} 
                    type="text" 
                    placeholder="Service Description"
                    onChangeText={(text) => handleNewService("desc", text)}
                    id={"desc"}
                    name={"desc"}  
                />
                <TextInput 
                    style={styles.input} 
                    type="text" 
                    placeholder="Service hours"
                    onChangeText={(text) => handleNewService("hours", text)}
                    id={"hours"}
                    name={"hours"}  
                />
                <Button 
                    title="Submit"
                    onPress={addService}
                />
                </View>
            )}
            {!newForm ? (
                <Button title={`Add Service`} onPress={handleForm} />
            ) : (
                <Button title={`Cancel Job`} onPress={handleForm} />
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
