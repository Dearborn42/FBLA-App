import React, {useState} from 'react'
import { View, Button, StyleSheet, ScrollView, Text, TextInput } from 'react-native';

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
            <View key={index} style={styles.classContainer}>
                <Text>{name} {index + 1}</Text>
                {categories.map(y => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {handleUpdate(text, y)}}
                        onBlur={() => update(x.name)}
                        placeholder={x[y]}
                    />
                ))}
                <Button title="Remove" onPress={() => remove(x.name)} />
            </View>
        ))} 
            {newForm && (
                <View>
                    {placeholders.map((x, i) => (
                        <TextInput 
                            style={styles.input} 
                            type="text" 
                            placeholder={x}
                            onChangeText={(text) => handleNewService(categories[i], text)} 
                        />
                    ))}
                    <Button 
                        title="Submit"
                        onPress={() => add()}
                    />
                </View>
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