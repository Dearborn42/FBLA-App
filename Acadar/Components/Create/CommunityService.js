import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import UserContext from '../UserContext';


const CommunityService = ({ data, navigation}) => {
    const [form, setForm] = useState({"communityService": []});
    const { setUser } = useContext(UserContext);
    const addService = () => {
        setForm((prev) => {
            const newService = { "name": '', "desc": '', "hours": ''};
            return { ...prev, "communityService": [...prev.communityService, newService]};
        });
    };

    const removeField = (index) => {
        setForm((prev) => {
            const updatedService = [...prev.communityService];
            updatedService.splice(index, 1);
            return { ...prev, "communityService": updatedService };
        });
    };
    const updateService = (index, field, value) => {
        setForm((prev) => {
            const updatedServices = [...prev.communityService];
            const updatedService = { ...updatedServices[index] };
            updatedService[field] = value;
            updatedServices[index] = updatedService;
            return { ...prev, "communityService": updatedServices };
        });
    };

    const handleSubmit = async () => {
        var length = 0;
        var check = 0;
        form.communityService.forEach((art) => {
            length += 3;
            const values = Object.values(art);
            values.forEach((value) => {
              if(value.trim() != "") check++;
            })
        })
        if(check === length){
            var body1 = await fetch("http://localhost:5000/create1", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({...data, ...form})
            });
            var body1_response = await body1.json();
            if (body1_response.success){
                setUser(body1_response.user);
                navigation.navigate('App');
            }
        }
    }

    return (
    <View style={styles.container}>
        <Text style={styles.header}>Enter your Community Services</Text>
        <View>
        {form.communityService.map((service, index ) => (
            <View key={index} style={styles.classContainer}>
              <Text>Service {index + 1}</Text>
              <TextInput
                style={styles.input}
                value={service.name}
                onChangeText={(text) => updateService(index, "name", text)}
                placeholder="Enter service name"
                required
                id={"name"}
                name={"name"}
              />
              <TextInput
                style={styles.input}
                value={service.desc}
                onChangeText={(text) => updateService(index, "desc", text)}
                placeholder="Enter service experience"
                required
                id={"desc"}
                name={"desc"}
              />
              <TextInput
                style={styles.input}
                value={service.award}
                onChangeText={(text) => updateService(index, "hours", text)}
                placeholder="Enter amount of hours on this service"
                required
                id={"hours"}
                name={"hours"}
              />
              <Button title="Remove" onPress={() => removeField(index)} />
            </View>
        ))}
            <Button title={`Add Service`} onPress={() => addService()} />
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


export default CommunityService