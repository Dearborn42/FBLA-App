import React, {useState} from 'react'
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import UpdateForm from '../Forms/UpdateForm';
import AddForm from '../Forms/AddForm';

const UpdateComponent = ({user, userField, categories, placeholders, buttonNames, name, newFormObj}) => {
    const [newForm, setNewForm] = useState(false);
    const [newService, setNewService] = useState(newFormObj);
    const [field, setField] = useState("");
    const [value, setValue] = useState("");

    var handleUpdate = (text, category) => {setValue(text); setField(category)}
    var handleNewService = (field, value) => setNewService((prev) => {return {...prev, ...{[field]: value}}});
    var handleForm = () => {
        setNewService(newFormObj)
        setNewForm((prev) => !prev);
    };

    const add = async() => {
        var body1 = await fetch(`http://localhost:5000/functions/add/${userField}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(newService)
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
        if(value.trim() === "") return;
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
        <View>
        {user[userField].map((x, index ) => (
          <UpdateForm
            key={index} 
            index={index}
            item={x}
            name={name}
            remove={remove}
            update={update}
            onChange={handleUpdate}
            categories={categories}
            styles={styles}
          />
        ))} 
            {newForm && (
              <AddForm 
                key={0} 
                styles={styles}
                placeholders={placeholders}
                newFunc={handleNewService}
                categories={categories}
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

export default UpdateComponent