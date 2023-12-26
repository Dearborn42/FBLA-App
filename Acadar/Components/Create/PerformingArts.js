import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


const PerformingArts = ({mod}) => {
    const [form, setForm] = useState({"performing-arts": []});

    const addArt = () => {
        setForm((prev) => {
            const newArt = { "name": '', "desc": '', "award": ''};
            return { ...prev, "performing-arts": [...prev["performing-arts"], newArt]};
        });
    };

    const removeField = (index) => {
        setForm((prev) => {
            const updatedSport = [...prev["performing-arts"]];
            updatedSport.splice(index, 1);
            return { ...prev, "performing-arts": updatedSport };
        });
    };
    const updateSport = (index, field, value) => {
        setForm((prev) => {
            const updatedSports = [...prev["performing-arts"]];
            const updatedSport = { ...updatedSports[index] };
            updatedSport[field] = value;
            updatedSports[index] = updatedSport;
            return { ...prev, "performing-arts": updatedSports };
        });
    };

    const handleSubmit = async () => {
        var body6 = await fetch("http://localhost:5000/create6", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({form})
        });
        var body6_response = await body6.json();
        if (body6_response.success){
            mod((prev) => prev += 1);
        }
    }

    return (
    <View style={styles.container}>
        <Text style={styles.header}>Enter your performing arts</Text>
        <View>
        {form["performing-arts"].map((art, index ) => (
            <View key={index} style={styles.classContainer}>
              <Text>Art {index + 1}</Text>
              <TextInput
                style={styles.input}
                value={art.name}
                onChangeText={(text) => updateSport(index, "name", text)}
                placeholder="Enter art name"
                required
                id={"name"}
                name={"name"}
              />
              <TextInput
                style={styles.input}
                value={art.desc}
                onChangeText={(text) => updateSport(index, "desc", text)}
                placeholder="Enter sport experience"
                required
                id={"desc"}
                name={"desc"}
              />
              <TextInput
                style={styles.input}
                value={art.award}
                onChangeText={(text) => updateSport(index, "award", text)}
                placeholder="Enter sport highest award/achievment"
                required
                id={"award"}
                name={"award"}
              />
              <Button title="Remove" onPress={() => removeField(index)} />
            </View>
        ))}
            <Button title={`Add Art`} onPress={() => addArt()} />
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

export default PerformingArts