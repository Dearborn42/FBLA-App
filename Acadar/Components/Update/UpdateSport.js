import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import ThreeAddForm from '../Forms/ThreeAddForm';
import ThreeUpdateForm from '../Forms/ThreeUpdateForm';


export default function UpdateSports({user}){
    const [newForm, setNewForm] = useState(false);
    const [sport, setSport] = useState({"name": '', "desc": '', "award": ""});
    const [field, setField] = useState("");
    const [value, setValue] = useState("");

    var handleUpdate = (text, category) => {setValue(text); setField(category)}
    var handleNewService = (field, value) => setSport((prev) => {return {...prev, ...{[field]: value}}});
    var handleForm = () => {
        setSport({"name": '', "desc": '', "award": ""})
        setNewForm((prev) => !prev);
    };

    const addService = async() => {
        var body1 = await fetch(`http://localhost:5000/functions/add/sports`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(sport)
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };

    const removeService = async (name) => {
        var body1 = await fetch(`http://localhost:5000/functions/remove/sports/${name}`, {
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
        var body1 = await fetch(`http://localhost:5000/functions/update/sports/${name}/${field}`, {
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
        {user.sports.map((sport, index ) => (
          <ThreeUpdateForm
            key={index} 
            index={index}
            item={sport}
            remove={removeService}
            update={updateService}
            onChange={handleUpdate}
            categories={["name", "desc", "award"]}
            styles={styles}
          />
        ))} 
            {newForm && (
              <ThreeAddForm 
                key={0} 
                styles={styles}
                placeholders={["Sport Name", "Sport Description", "Sport award/highest achievment"]}
                newFunc={handleNewService}
                add={addService}
              />
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
