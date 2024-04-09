import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { UserContext } from '../../app/_layout';
import * as SecureStore from 'expo-secure-store';

const UpdateStudent = () => {
    const {currentUser, updateCurrentUser, reset, setReset} = useContext(UserContext);
    const [form, setForm] = useState({value: ""});
    const [type, setType] = useState("");
    useEffect(() => {setReset(false)}, [reset]);
    function handleType(text){
        setType(text);
    }
    function updateForm(textValue) {
        return setForm({value: textValue});
    }
    async function handleBlur(){
      if(form.value.trim() === "") return;
      const token = await SecureStore.getItemAsync("authToken");
      if(!token) return;
      var body1 = await fetch(`http://172.233.131.223:5000/studentInfo/update/${type}`, {
          method: 'POST',
          headers: { "Content-Type": "application/json", "auth": token },
          body: JSON.stringify(form)
      });
      var body1_response = await body1.json();
      if (body1_response.success){
        if(type !== "password"){
          currentUser[`${type}`] = form.value;
        }
        currentUser.password = "***********";
      }else{
        console.log(body1_response.message)
      }
    }

    return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}> 
        <Text style={styles.text}>Edit your name</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        onBlur={()=>handleBlur()}
        placeholder={currentUser.name}
        onFocus={() => handleType("name")}
        id={"name"}
        name={"name"}
        />
        <Text style={styles.text}>Edit your Email</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        placeholder={currentUser.email}
        onFocus={() => handleType("email")}
        id={"email"}
        name={"email"}
        />
        <Text style={styles.text}>Edit your Password</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        placeholder="Edit your password"
        onFocus={() => handleType("password")}
        id={"password"}
        name={"password"}
        secureTextEntry={true}
        />
        
        <Text style={styles.text}>Edit your Grade Level</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => updateForm(text)}
        placeholder={currentUser.grade_level}
        onFocus={() => handleType("grade_level")}
        id={"grade_level"}
        name={"grade_level"}
        />
        <Text style={styles.text}>Edit your School</Text>
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
  bText: {
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
    borderRadius: 32,
    padding: 10,
    marginBottom: 16,
  },
  container: {
    
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 32,
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
    borderRadius: 32,
  },
});


export default UpdateStudent