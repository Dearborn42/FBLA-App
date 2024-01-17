import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

export default function Clubs({ mod, data }) {
  const [form, setForm] = useState({ clubs: [] });

  const addClub = () => {
    setForm((prev) => {
      const newClub = { name: '', desc: '' };
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

  function handleSubmit() {
    var length = 0;
    var check = 0;
    form.clubs.forEach((club) => {
      length += 2;
      const values = Object.values(club);
      values.forEach((value) => {
        if (value.trim() != '') check++;
      });
    });
    if (check === length) {
      data((prev) => {
        return { ...prev, ...form };
      });
      mod((prev) => (prev += 1));
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter your clubs</Text>
      <View>
        {form.clubs.map((club, index) => (
          <View key={index} style={styles.classContainer}>
            <Text>Club {index + 1}</Text>
            <TextInput
              style={styles.input}
              value={club['name']}
              onChangeText={(text) => updateClass(index, 'name', text)}
              placeholder='Enter club name'
              required
              id={'name'}
              name={'name'}
            />
            <TextInput
              style={styles.input}
              value={club['desc']}
              onChangeText={(text) => updateClass(index, 'desc', text)}
              placeholder='Enter club description'
              required
              id={'desc'}
              name={'desc'}
            />
            <Button title='Remove' onPress={() => removeField(index)} />
          </View>
        ))}
        <Button title={`Add Club`} onPress={() => addClub()} />
      </View>
      <Button title='Submit' onPress={handleSubmit} />
    </View>
  );
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
