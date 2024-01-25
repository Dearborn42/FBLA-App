import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import TwoAddForm from '../Forms/TwoAddForm';
import TwoUpdateForm from '../Forms/TwoUpdateForm';


export default function UpdateJobs({user}){
    const [newForm, setNewForm] = useState(false);
    const [newJob, setNewJob] = useState({"name": '', "desc": ''});
    const [field, setField] = useState("");
    const [value, setValue] = useState("");

    var handleUpdate = (text, category) => {setValue(text); setField(category)}
    var handleNewClub = (field, value) => setNewJob((prev) => {return {...prev, ...{[field]: value}}});
    var handleForm = () => {
        setNewJob({"name": '', "desc": ''})
        setNewForm((prev) => !prev);
    };

    const addJob = async() => {      
        var body1 = await fetch(`http://localhost:5000/functions/add/work`, {
            method: 'POST',
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
        <View>
        {user.work.map((job, index ) => (
          <TwoUpdateForm 
            key={index}
            index={index}
            styles={styles}
            onChange={handleUpdate}
            item={job}
            update={updateClub}
            remove={removeJob}
            categories={["name", "desc"]}
          />
        ))} 
            {newForm && (
              <TwoAddForm 
                key={0}
                styles={styles}
                placeholders={["Job Name", "Job Description"]}
                newFunc={handleNewClub}
                add={addJob}
              />
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
