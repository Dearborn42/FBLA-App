import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import TwoAddForm from '../Forms/TwoAddForm';
import TwoUpdateForm from '../Forms/TwoUpdateForm';

export default function UpdateClubs({user}){
    const [newForm, setNewForm] = useState(false);
    const [newClub, setNewClub] = useState({"name": '', "desc": ''});
    const [field, setField] = useState("");
    const [value, setValue] = useState("");

    var handleUpdate = (text, category) => {setValue(text); setField(category)}
    var handleNewClub = (field, value) => setNewClub((prev) => {return {...prev, ...{[field]: value}}});
    var handleForm = () => {
        setNewClub({"name": '', "desc": ''})
        setNewForm((prev) => !prev);
    };

    const addClub = async() => {
        var body1 = await fetch(`http://localhost:5000/update/add/clubs`, {
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
        var body1 = await fetch(`http://localhost:5000/update/remove/clubs/${name}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };
    const updateClub = async (name) => {
        if(value === "") return;
        var body1 = await fetch(`http://localhost:5000/clubs/update/${name}/${field}`, {
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
    <ScrollView>
    <View style={styles.container}>
        <View>
        {user.clubs.map((club, index) => (
          <TwoUpdateForm 
            key={index}
            index={index}
            styles={styles}
            onChange={handleUpdate}
            item={club}
            update={updateClub}
            remove={removeClub}
            categories={["name", "desc"]}
          />
        ))} 
            {newForm && (
              <TwoAddForm 
                key={0}
                styles={styles}
                placeholders={["Club Name", "Club Description"]}
                newFunc={handleNewClub}
                add={addClub}
              />
            )}
            {!newForm ? (
                <Button title={`Add Club`} onPress={handleForm} />
            ) : (
                <Button title={`Cancel Club`} onPress={handleForm} />
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
