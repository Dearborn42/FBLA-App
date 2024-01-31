import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,Dimensions,
  ImageBackground,
  TouchableOpacity, } from 'react-native';
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
            var body1 = await fetch("http://172.233.131.223:5000/create1", {
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
      <ImageBackground
      source={require('../../assets/blue.png')}
      style={styles.backgroundImage}>
    <View style={styles.container}>
        <Text style={styles.header}>Enter your Community Services</Text>
        <View>
        {form.communityService.map((service, index ) => (
            <View key={index} style={styles.classContainer}>
              <Text style={styles.text}>Service {index + 1}</Text>
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
                placeholder="Enter amount of hours"
                required
                id={"hours"}
                name={"hours"}
              />
              <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => removeField(index)}>
              <Text style={styles.bText}>Remove</Text>
            </TouchableOpacity>
            </View>
        ))}
            <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={()=>addService()}>
          <Text style={styles.bText}>Add Service</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleSubmit}>
          <Text style={styles.bText}>Submit</Text>
        </TouchableOpacity>
    </View> 
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  classContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'none',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'none',
  },
  header: {
    color: 'black',
    fontFamily: 'ARCO',
    fontSize: 32,
    textAlign: 'center',
  },
  input: {
    width: Dimensions.get('window').width * 0.6,
    height: 32,
    color: 'black',
    fontFamily: 'ARCO',
    fontSize: 12,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 32,
    marginBottom: 20,
  },
  text: {
    color: 'black',
    fontFamily: 'ARCO',
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  bText: {
    fontFamily: 'ARCO',
    fontSize: 12,
    color: 'black',
  },
  button: {
    backgroundColor: 'white',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    padding: 8,
    marginBottom: 16,
  },
});


export default CommunityService