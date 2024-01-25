import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';


export default function UpdateJobs({user}){
    const [newForm, setNewForm] = useState(false);
    const [newJob, setNewJob] = useState({"name": '', "desc": ''});
    const [field, setField] = useState("");
    const [value, setValue] = useState("");

    var handleValue = (text) => setValue(text);
    var handleField = (textValue) => setField(textValue);
    var handleNewClub = (field, value) => setNewJob((prev) => {return {...prev, ...{[field]: value}}});
    var handleForm = () => {
        setNewJob({"name": '', "desc": ''})
        setNewForm((prev) => !prev);
    };

    const addJob = async() => {
        var body1 = await fetch(`http://localhost:5000/functions/add/work`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(newJob)
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };

    const removeJob = async (name) => {
        var body1 = await fetch(`http://localhost:5000/functions/remove/work/${name}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };
    const updateClub = async (name) => {
        if(value.trim() === "") return;
        var body1 = await fetch(`http://localhost:5000/functions/update/work/${name}/${field}`, {
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
        {user.work.map((job, index ) => (
            <View key={index} style={styles.classContainer}>
              <Text>Job {index + 1}</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {handleValue(text); handleField("name")}}
                onBlur={() => updateClub(job.name)}
                placeholder={job.name}
                required
                id={"name"}
                name={"name"}
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => {handleValue(text); handleField("desc")}}
                onBlur={() => updateClub(job.company)}
                placeholder={job.desc}
                required
                id={"desc"}
                name={"desc"}
              />
              <Button title="Remove" onPress={() => removeJob(job.company)} />
            </View>
        ))} 
            {newForm && (
                <View>
                <TextInput 
                    style={styles.input} 
                    type="text" 
                    placeholder="Job Name"
                    onChangeText={(text) => handleNewClub("name", text)}
                    id={"name"}
                    name={"name"} 
                />
                <TextInput 
                    style={styles.input} 
                    type="text" 
                    placeholder="Job Description"
                    onChangeText={(text) => handleNewClub("desc", text)}
                    id={"desc"}
                    name={"desc"}  
                />
                <Button 
                    title="Submit"
                    onPress={addJob}
                />
                </View>
            )}
            {!newForm ? (
                <Button title={`Add Job`} onPress={handleForm} />
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
