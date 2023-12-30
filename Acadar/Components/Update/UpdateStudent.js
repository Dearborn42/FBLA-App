import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'

const UpdateStudent = ({user}) => {
    const [form, setForm] = useState({value: ""});
    const [type, setType] = useState("");
    function handleType(text){
        setType(text);
    }
    function updateForm(textValue) {
        return setForm({value: textValue});
    }
    function handleBlur(){
        updateForm("");
    }

    const handleSubmit = async () => {
        console.log(`http://localhost:5000/studentInfo/update/${type}`);
        console.log(form)
        // var body1 = await fetch(`http://localhost:5000/studentInfo/update/${type}`, {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({...form})
        // });
        // var body1_response = await body1.json();
        // if (body1_response.success){
            
        // }
    }

    return (
    <View style={styles.container}> 
        <Text style={{color: "black"}}>Edit your name</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        placeholder={user.name}
        onFocus={() => handleType("name")}
        id={"name"}
        name={"name"}
        />
        {type === "name" && (<Button title="Submit" onPress={handleSubmit} />)}
        <Text>Edit your Email</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        placeholder={user.email}
        onFocus={() => handleType("email")}
        id={"email"}
        name={"email"}
        />
        {type === "email" && (<Button title="Submit" onPress={handleSubmit} />)}
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
        {type === "password" && (<Button title="Submit" onPress={handleSubmit} />)}
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
        {type === "share-pin" && (<Button title="Submit" onPress={handleSubmit} />)}
        <Text>Edit your privacy</Text>
        <SelectDropdown
            data={["Yes", "No"]}
            onSelect={(itemValue) => updateForm(itemValue === 'Yes')}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            onFocus={() => handleType("private")}
        />
        {type === "private" && (<Button title="Submit" onPress={handleSubmit} />)}
        <Text>Edit your Grade Level</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        placeholder={user.grade_level}
        onFocus={() => handleType("grade_level")}
        id={"grade_level"}
        name={"grade_level"}
        />
        {type === "grade_level" && (<Button title="Submit" onPress={handleSubmit} />)}
        <Text>Edit your School</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        placeholder={user.school}
        onFocus={() => handleType("school")}
        onBlur={() => handleBlur()}
        id={"school"}
        name={"school"}
        />
        {type === "school" && (<Button title="Submit" onPress={handleSubmit} />)}
    </View>
  )
}

const styles = StyleSheet.create({
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