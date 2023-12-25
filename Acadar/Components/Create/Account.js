import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

const Account = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        "share-pin": "",
        private: false,
        grade_level: "",
        school: "",
    });
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    async function handleSubmit(){
        var body1 = await fetch("http://localhost:5000/create-1", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({form})
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            console.log("Hell yeah!");
        }
    }
  return (
    <View style={styles.container}> 
        <Text>Name</Text>
        <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(text) => updateForm({ name: text })}
        placeholder="Enter your full name"
        required
        id={"name"}
        name={"name"}
        />
        <br />
        <Text>Email</Text>
        <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(text) => updateForm({ email: text })}
        placeholder="Enter your email"
        required
        id={"email"}
        name={"email"}
        />
        <br />
        <Text>Password</Text>
        <TextInput
        style={styles.input}
        value={form.password}
        onChangeText={(text) => updateForm({ password: text })}
        placeholder="Enter your password"
        required
        id={"password"}
        name={"password"}
        secureTextEntry={true}
        />
        <br />
        <Text>Pin to share with others</Text>
        <TextInput
        style={styles.input}
        value={form["share-pin"]}
        onChangeText={(text) => updateForm({ "share-pin": text })}
        placeholder="Enter your share-pin"
        required
        id={"share-pin"}
        name={"share-pin"}
        secureTextEntry={true}
        />
        <br />
        <Text>Do you want a private account?</Text>
        <Picker
            selectedValue={form.private ? 'true' : 'false'}
            onValueChange={(itemValue) => updateForm({ private: itemValue === 'true' })}
            style={styles.picker} 
            required
        >
            <Picker.Item label="Yes" value="true" />
            <Picker.Item label="No" value="false" />
        </Picker>
        <br />
        <Text>Grade Level</Text>
        <TextInput
        style={styles.input}
        value={form.grade_level}
        onChangeText={(text) => updateForm({ grade_level: text })}
        placeholder="Enter your grade level"
        required
        id={"grade_level"}
        name={"grade_level"}
        />
        <br />
        <Text>School</Text>
        <TextInput
        style={styles.input}
        value={form.school}
        onChangeText={(text) => updateForm({ school: text })}
        placeholder="Enter your high school"
        required
        id={"school"}
        name={"school"}
        />
        <br />
        <Button title="Submit" onPress={handleSubmit} />
        <br />
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

export default Account