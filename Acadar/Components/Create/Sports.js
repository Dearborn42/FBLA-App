import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Dimensions,
  ImageBackground,
  TouchableOpacity } from 'react-native';


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
      var length = 0;
      var check = 0;
      form.sports.forEach((sport) => {
        length += 3;
        const values = Object.values(sport);
        values.forEach((value) => {
          if(value.trim() != "") check++;
        })
      })
      if(check === length){
        data((prev) => {return { ...prev, ...form }});
        mod((prev) => prev += 1);
      }
    }

    return (
      <ImageBackground
      source={ require('../../assets/blue.png')}
      style={styles.backgroundImage}>
    <View style={styles.container}>
        <Text style={styles.header}>Enter your sports</Text>
        <View>
        {form.sports.map((sport, index ) => (
            <View key={index} style={styles.classContainer}>
              <Text style={styles.text}>Sport {index + 1}</Text>
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
          onPress={()=>addSport()}>
          <Text style={styles.bText}>Add Sport</Text>
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

export default Sports