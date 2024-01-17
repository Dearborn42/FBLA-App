import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Dimensions,
  ImageBackground,
  TouchableOpacity, } from 'react-native';


const PerformingArts = ({mod, data}) => {
    const [form, setForm] = useState({"perfrormingArts": []});

    const addArt = () => {
        setForm((prev) => {
            const newArt = { "name": '', "desc": '', "award": ''};
            return { ...prev, "perfrormingArts": [...prev.perfrormingArts, newArt]};
        });
    };

    const removeField = (index) => {
        setForm((prev) => {
            const updatedSport = [...prev.perfrormingArts];
            updatedSport.splice(index, 1);
            return { ...prev, "perfrormingArts": updatedSport };
        });
    };
    const updateSport = (index, field, value) => {
        setForm((prev) => {
            const updatedSports = [...prev.perfrormingArts];
            const updatedSport = { ...updatedSports[index] };
            updatedSport[field] = value;
            updatedSports[index] = updatedSport;
            return { ...prev, "perfrormingArts": updatedSports };
        });
    };

    function handleSubmit(){
      var length = 0;
      var check = 0;
      form.perfrormingArts.forEach((art) => {
        length += 3;
        const values = Object.values(art);
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
      source={{ uri: require('../../assets/blue.svg') }}
      style={styles.backgroundImage}>
    <View style={styles.container}>
        <Text style={styles.header}>Enter your performing arts</Text>
        <View>
        {form.perfrormingArts.map((art, index ) => (
            <View key={index} style={styles.classContainer}>
              <Text style={styles.text}>Art {index + 1}</Text>
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
                placeholder="Enter art experience"
                required
                id={"desc"}
                name={"desc"}
              />
              <TextInput
                style={styles.input}
                value={art.award}
                onChangeText={(text) => updateSport(index, "award", text)}
                placeholder="Enter highest award/achievment"
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
          onPress={()=>addArt()}>
          <Text style={styles.bText}>Add Art</Text>
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
    fontSize: '2rem',
    textAlign: 'center',
  },
  input: {
    width: Dimensions.get('window').width * 0.6,
    height: '2rem',
    color: 'black',
    fontFamily: 'ARCO',
    fontSize: '.75rem',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: '2rem',
    marginBottom: 20,
  },
  text: {
    color: 'black',
    fontFamily: 'ARCO',
    fontSize: '1rem',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  bText: {
    fontFamily: 'ARCO',
    fontSize: '.75rem',
    color: 'black',
  },
  button: {
    backgroundColor: 'white',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '2rem',
    padding: '.5rem',
    marginBottom: '1rem',
  },
});

export default PerformingArts