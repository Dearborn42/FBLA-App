import React, {useState, useContext} from 'react'
import { View, Button, StyleSheet, ScrollView, Text, TextInput } from 'react-native';
import { UserContext } from '../UserContent';

const UpdateComponent = ({userField, categories, placeholders, buttonNames, name, newFormObj}) => {
    const {currentUser, add, remove, update, handleUpdate} = useContext(UserContext)
    const [newForm, setNewForm] = useState(false);
    const [newService, setNewService] = useState(newFormObj);

    var handleNewService = (field, value) => setNewService((prev) => {return {...prev, ...{[field]: value}}});
    var handleForm = () => {
        setNewService(newFormObj)
        setNewForm((prev) => !prev);
    };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
        <View>
        {currentUser[userField].map((x, index ) => (
            <View key={index} style={styles.classContainer}>
                <Text>{name} {index + 1}</Text>
                {categories.map(y => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {handleUpdate(text, y)}}
                        onBlur={() => update(userField, x.name)}
                        placeholder={x[y]}
                    />
                ))}
                <Button title="Remove" onPress={() => remove(userField, x.name)} />
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
                        onPress={() => add(userField, newService)}
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