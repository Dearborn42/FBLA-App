import React, {useState, useContext} from 'react'
import { View, Button, StyleSheet, ScrollView, Text, TextInput,TouchableOpacity } from 'react-native';
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
                <Text style={styles.header}>{data.name} {index + 1}</Text>
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
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.button}
                      onPress={() => add(data.userField, newService)}>
                      <Text style={styles.bText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )}
            {!newForm ? (
                <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.button}
                      onPress={handleForm}>
                      <Text style={styles.bText}>{data.buttonNames[0]}</Text>
                    </TouchableOpacity>
            ) : (
                <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.button}
                      onPress={handleForm}>
                      <Text style={styles.bText}>{data.buttonNames[1]}</Text>
                    </TouchableOpacity>
            )}
        </View>
    </View> 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },bText: {
    // fontFamily: 'ARCO',
    fontSize: 20,
    color: 'black',
    fontFamily: 'MontHeavyDemo',

  },
  button: {
    fontFamily: 'MontHeavyDemo',
    
    backgroundColor: 'white',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 16,
  },
  container: {
    
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: '#fff',
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  text: {
    color: 'black',
    fontFamily: 'MontHeavyDemo',
    fontSize: 20,
  },
  input: {
    width: "100%",
    height: 40,
    color: 'black',
    fontFamily: 'MontHeavyDemo',
    fontSize: 14,
    backgroundColor: 'white',
    padding: 10,
    borderStyle:"solid",
    borderWidth:1,
    borderColor:"black",
    marginBottom: 8,
  },
});

export default UpdateComponent