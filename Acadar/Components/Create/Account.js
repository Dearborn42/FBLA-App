import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'

const Account = ({mod, data}) => {  
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
    function handleSubmit(){
      const values = Object.values(form);
      var check = 0
      values.forEach(value => {
        if(value === false || value === true){
          check++;
          return;
        }  
        if(value != "") check++;
      });
      if(check === values.length){
        data((prev) => {return { ...prev, ...form }});
        mod((prev) => prev += 1);
      }
    }
  return (
    <View style={styles.container}> 
        <Text style={{color: "black"}}>Name</Text>
        <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(text) => updateForm({ name: text })}
        placeholder="Enter your full name"
        required
        id={"name"}
        name={"name"}
        />
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
        <Text>Do you want a private account?</Text>
        <SelectDropdown
            data={["Yes", "No"]}
            onSelect={(itemValue) => updateForm({ private: itemValue === 'Yes' })}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
        />
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

export default Account