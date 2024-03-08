import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { UserContext } from '../UserContent';

const UpdateStudent = () => {
    const {currentUser} = useContext(UserContext);
    const [form, setForm] = useState({value: ""});
    const [type, setType] = useState("");
    function handleType(text){
        setType(text);
    }
    function updateForm(textValue) {
        return setForm({value: textValue});
    }
    async function handleBlur(){
      if(form.value.trim() === "") return;
      var body1 = await fetch(`http://localhost:5000/studentInfo/update/${type}`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form)
      });
      var body1_response = await body1.json();
      if (body1_response.success){
          
      }
    }

    return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}> 
        <Text style={{color: "black"}}>Edit your name</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        onBlur={()=>handleBlur()}
        placeholder={currentUser.name}
        onFocus={() => handleType("name")}
        id={"name"}
        name={"name"}
        />
        <Text>Edit your Email</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        placeholder={currentUser.email}
        onFocus={() => handleType("email")}
        id={"email"}
        name={"email"}
        />
        <Text>Edit your Password</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        placeholder="Edit your password"
        onFocus={() => handleType("password")}
        id={"password"}
        name={"password"}
        secureTextEntry={true}
        />
        <Text>Edit your share pin</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        placeholder="Edit your share pin"
        onFocus={() => handleType("share-pin")}
        id={"share-pin"}
        name={"share-pin"}
        secureTextEntry={true}
        />
        <Text>Edit your privacy</Text>
        <SelectDropdown
            data={["Yes", "No"]}
            onSelect={(itemValue) => updateForm(itemValue === 'Yes')}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            onFocus={() => handleType("private")}
        />
        <Text>Edit your Grade Level</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        placeholder={currentUser.grade_level}
        onFocus={() => handleType("grade_level")}
        id={"grade_level"}
        name={"grade_level"}
        />
        <Text>Edit your School</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        placeholder={currentUser.school}
        onFocus={() => handleType("school")}
        onBlur={() => handleBlur()}
        id={"school"}
        name={"school"}
        />
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


export default UpdateStudent