import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import TwoAddForm from '../Forms/TwoAddForm';
import TwoUpdateForm from '../Forms/TwoUpdateForm';

const UpdateTwo = ({user, userField, categories, placeholders, buttonNames}) => {
    const [newForm, setNewForm] = useState(false);
    const [newClub, setNewClub] = useState({"name": '', "desc": ''});
    const [field, setField] = useState("");
    const [value, setValue] = useState("");

    var handleUpdate = (text, category) => {setValue(text); setField(category)}
    var handleNewForm = (field, value) => setNewClub((prev) => {return {...prev, ...{[field]: value}}});
    var handleForm = () => {
        setNewClub({"name": '', "desc": ''});
        setNewForm((prev) => !prev);
    };
    const add = async() => {
        var body1 = await fetch(`http://localhost:5000/functions/add/${userField}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(newClub)
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };
    const remove = async (name) => {
        var body1 = await fetch(`http://localhost:5000/functions/remove/${userField}/${name}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };
    const update = async (name) => {
        if(value === "") return;
        var body1 = await fetch(`http://localhost:5000/functions/update/${userField}/${name}/${field}`, {
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
        {user[userField].map((x, index) => (
          <TwoUpdateForm 
            key={index}
            index={index}
            styles={styles}
            onChange={handleUpdate}
            item={x}
            update={update}
            remove={remove}
            categories={categories}
          />
        ))} 
            {newForm && (
              <TwoAddForm 
                key={0}
                styles={styles}
                placeholders={placeholders}
                // placeholders={["Club Name", "Club Description"]}
                newFunc={handleNewForm}
                add={add}
              />
            )}
            {!newForm ? (
                <Button title={buttonNames[0]} onPress={handleForm} />
            ) : (
                <Button title={buttonNames[1]} onPress={handleForm} />
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


export default UpdateTwo