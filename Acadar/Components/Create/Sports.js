import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


const Sports = ({mod}) => {
    const [form, setForm] = useState({sports: []});

    const addSport = () => {
        setForm((prev) => {
            const newSport = { "sport": '', "sport-desc": '', "awards/achievments": ''};
            return { ...prev, sports: [...prev.sports, newSport]};
        });
    };

    const removeField = (index) => {
        setForm((prev) => {
            const updatedSport = [...prev.sports];
            updatedSport.splice(index, 1);
            return { ...prev, sports: updatedSport };
        });
    };
    const updateSport = (index, field, value) => {
        setForm((prev) => {
            const updatedSports = [...prev.sports];
            const updatedSport = { ...updatedSports[index] };
            updatedSport[field] = value;
            updatedSports[index] = updatedSport;
            return { ...prev, sports: updatedSports };
        });
    };

    const handleSubmit = async () => {
        var body5 = await fetch("http://localhost:5000/create5", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({form})
        });
        var body5_response = await body5.json();
        if (body5_response.success){
            mod((prev) => prev += 1);
        }
    }

    return (
    <View style={styles.container}>
        <Text style={styles.header}>Enter your sports</Text>
        <View>
        {form.sports.map((sport, index ) => (
            <View key={index} style={styles.classContainer}>
              <Text>Sport {index + 1}</Text>
              <TextInput
                style={styles.input}
                value={sport.sport}
                onChangeText={(text) => updateSport(index, sport, text)}
                placeholder="Enter sport name"
                required
                id={"sport"}
                name={"sport"}
              />
              <TextInput
                style={styles.input}
                value={sport["sport-desc"]}
                onChangeText={(text) => updateSport(index, "sport-desc", text)}
                placeholder="Enter sport experience"
                required
                id={"sport-desc"}
                name={"sport-desc"}
              />
              <TextInput
                style={styles.input}
                value={sport["awards/achievments"]}
                onChangeText={(text) => updateSport(index, "awards/achievments", text)}
                placeholder="Enter sport highest award/achievment"
                required
                id={"awards/achievments"}
                name={"awards/achievments"}
              />
              <Button title="Remove" onPress={() => removeField(index)} />
            </View>
        ))}
            <Button title={`Add Sport`} onPress={() => addSport()} />
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

export default Sports