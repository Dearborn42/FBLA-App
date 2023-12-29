import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';

const Login = () => {  
    const [form, setForm] = useState({email: "", password: "",});
    var updateForm = (value) => setForm((prev) => {return { ...prev, ...value }});
    async function handleSubmit(){
        var login = await fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(form)
        })
        var login_response = await login.json();
        if(login_response.success){
            console.log(login_response.user)
        }
    }
  return (
    <View style={styles.container}> 
        <Text>Email</Text>
        <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(text) => updateForm({ email: text.trim() })}
        placeholder="Enter your email"
        required
        id={"email"}
        name={"email"}
        />
        <Text>Password</Text>
        <TextInput
        style={styles.input}
        value={form.password}
        onChangeText={(text) => updateForm({ password: text.trim() })}
        placeholder="Enter your password"
        required
        id={"password"}
        name={"password"}
        secureTextEntry={true}
        />
        <Button title="Submit" onPress={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
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

export default Login