import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


export default function Clubs({mod}){
    const [form, setForm] = useState({clubs: []});

    const addClub = () => {
        setForm((prev) => {
            const newClub = { "name": '', "desc": '' };
            return { ...prev, clubs: [...prev.clubs, newClub] };
        });
    };

    const removeField = (index) => {
        setForm((prev) => {
            const updatedClubs = [...prev.clubs];
            updatedClubs.splice(index, 1);
            return { ...prev, clubs: updatedClubs };
        });
    };
    const updateClass = (index, field, value) => {
        setForm((prev) => {
            const updatedClubs = [...prev.clubs];
            const updatedClub = { ...updatedClubs[index] };
            updatedClub[field] = value;
            updatedClubs[index] = updatedClub;
            return { ...prev, clubs: updatedClubs };
        });
    };

    const handleSubmit = async () => {
        var body3 = await fetch("http://localhost:5000/create3", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({form})
        });
        var body3_response = await body3.json();
        if (body3_response.success){
            mod((prev) => prev += 1);
        }
    }
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Enter your clubs</Text>
        <View>
        {form.clubs.map((club, index ) => (
            <View key={index} style={styles.classContainer}>
              <Text>Club {index + 1}</Text>
              <TextInput
                style={styles.input}
                value={club["name"]}
                onChangeText={(text) => updateClass(index, "name", text)}
                placeholder="Enter club name"
                required
                id={"name"}
                name={"name"}
              />
              <TextInput
                style={styles.input}
                value={club["desc"]}
                onChangeText={(text) => updateClass(index, "desc", text)}
                placeholder="Enter club description"
                required
                id={"desc"}
                name={"desc"}
              />
              <Button title="Remove" onPress={() => removeField(index)} />
            </View>
        ))}
            <Button title={`Add Club`} onPress={() => addClub()} />
        </View>
        <Button title="Submit" onPress={handleSubmit} />
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
