import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import ThreeUpdateForm from '../Forms/ThreeUpdateForm';
import ThreeAddForm from '../Forms/ThreeAddForm';

export default function UpdateArts({user}){
    const [newForm, setNewForm] = useState(false);
    const [art, setArt] = useState({"name": '', "desc": '', "award": ""});
    const [field, setField] = useState("");
    const [value, setValue] = useState("");
    
    var handleUpdate = (text, category) => {setValue(text); setField(category)}
    var handleNewService = (field, value) => setArt((prev) => {return {...prev, ...{[field]: value}}});
    var handleForm = () => {
        setArt({"name": '', "desc": '', "award": ""})
        setNewForm((prev) => !prev);
    };

    const addService = async() => {
        var body1 = await fetch(`http://localhost:5000/functions/add/perfrormingArts`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(art)
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };

    const removeService = async (name) => {
        var body1 = await fetch(`http://localhost:5000/functions/remove/perfrormingArts/${name}`, {
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
        var body1 = await fetch(`http://localhost:5000/functions/update/perfrormingArts/${name}/${field}`, {
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
        {user.perfrormingArts.map((art, index ) => (
            <ThreeUpdateForm
              key={index} 
              index={index}
              item={art}
              remove={removeService}
              update={updateService}
              onChange={handleUpdate}
              categories={["name", "desc", "award"]}
              styles={styles}
            />
        ))} 
        {newForm && (
          <ThreeAddForm 
            styles={styles}
            placeholders={["Art Name", "Art Description", "Art award/highest achievment"]}
            newFunc={handleNewService}
            add={addService}
          />
        )}
        {!newForm ? (
            <Button title={`Add Art`} onPress={handleForm} />
        ) : (
            <Button title={`Cancel Art`} onPress={handleForm} />
        )}
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
