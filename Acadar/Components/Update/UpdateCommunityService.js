import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import ThreeAddForm from '../Forms/ThreeAddForm';
import ThreeUpdateForm from '../Forms/ThreeUpdateForm';


export default function UpdateCommunityServce({user}){
    const [newForm, setNewForm] = useState(false);
    const [newService, setNewService] = useState({"name": '', "desc": '', "hours": ""});
    const [field, setField] = useState("");
    const [value, setValue] = useState("");

    var handleUpdate = (text, category) => {setValue(text); setField(category)}
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
          <ThreeUpdateForm
            key={index} 
            index={index}
            item={service}
            remove={removeService}
            update={updateService}
            onChange={handleUpdate}
            categories={["name", "desc", "hours"]}
            styles={styles}
          />
        ))} 
            {newForm && (
              <ThreeAddForm 
                key={0} 
                styles={styles}
                placeholders={["Service Name", "Service Description", "Service hours"]}
                newFunc={handleNewService}
                add={addService}
              />
            )}
            {!newForm ? (
                <Button title={`Add Service`} onPress={handleForm} />
            ) : (
                <Button title={`Cancel Service`} onPress={handleForm} />
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
