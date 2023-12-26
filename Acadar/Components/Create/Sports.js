import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


const Sports = ({mod, data}) => {
    const [form, setForm] = useState({sports: []});

    const addSport = () => {
        setForm((prev) => {
            const newSport = { "name": '', "desc": '', "award": ''};
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

    function handleSubmit(){
      data((prev) => {return { ...prev, ...form }});
      mod((prev) => prev += 1);
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
                value={sport.name}
                onChangeText={(text) => updateSport(index, "name", text)}
                placeholder="Enter sport name"
                required
                id={"name"}
                name={"name"}
              />
              <TextInput
                style={styles.input}
                value={sport["desc"]}
                onChangeText={(text) => updateSport(index, "desc", text)}
                placeholder="Enter sport experience"
                required
                id={"desc"}
                name={"desc"}
              />
              <TextInput
                style={styles.input}
                value={sport["award"]}
                onChangeText={(text) => updateSport(index, "award", text)}
                placeholder="Enter sport highest award/achievment"
                required
                id={"award"}
                name={"award"}
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