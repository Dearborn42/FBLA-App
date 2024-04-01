import React, {useState, useContext} from 'react'
import { View, Button, StyleSheet, ScrollView, Text, TextInput } from 'react-native';
import { UserContext } from '../../app/_layout';

const UpdateComponent = ({data}) => {
    const {currentUser, add, remove, update, handleUpdate} = useContext(UserContext)
    const [newForm, setNewForm] = useState(false);
    const [newService, setNewService] = useState(data.newFormObj);

    var handleNewService = (field, value) => setNewService((prev) => {return {...prev, ...{[field]: value}}});
    var handleForm = () => {
        setNewService(data.newFormObj)
        setNewForm((prev) => !prev);
    };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
        <View>
        {currentUser[data.userField].map((x, index ) => { console.log(x.name, data.userField); return(
            <View key={index} style={styles.classContainer}>
                <Text>{data.name} {index + 1}</Text>
                {data.categories.map(y => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {handleUpdate(text, y)}}
                        onBlur={() => update(data.userField, x.name)}
                        placeholder={x[y]}
                    />
                ))}
                <Button title="Remove" onPress={() => remove(data.userField, x.name)} />
            </View>
        )})} 
            {newForm && (
                <View>
                    {data.placeholders.map((x, i) => (
                        <TextInput 
                            style={styles.input} 
                            type="text" 
                            placeholder={x}
                            onChangeText={(text) => handleNewService(data.categories[i], text)} 
                        />
                    ))}
                    <Button 
                        title="Submit"
                        onPress={() => add(data.userField, newService)}
                    />
                </View>
            )}
            {!newForm ? (
                <Button title={data.buttonNames[0]} onPress={handleForm} />
            ) : (
                <Button title={data.buttonNames[1]} onPress={handleForm} />
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