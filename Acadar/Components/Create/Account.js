import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const Account = ({ mod, data }) => {
  function updateForm(value) {
    return data.setCreateForm((prev) => {
      return { ...prev, ...value };
    });
  }
  function handleSubmit() {
    const {createForm} = data;
    const values = [
      createForm.name, 
      createForm.email, 
      createForm.password, 
      createForm["share-pin"], 
      createForm.private, 
      createForm.grade_level, 
      createForm.school
    ]
    if(values.every(x => x !== "")) {
      mod((prev) => (prev += 1));
    }
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/sky.png')}></Image>
      <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.input}
        value={data.createForm.name}
        onChangeText={(text) => updateForm({ name: text })}
        placeholder='Enter your full name'
        required
        id={'name'}
        name={'name'}
      />
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        value={data.createForm.email}
        onChangeText={(text) => updateForm({ email: text })}
        placeholder='Enter your email'
        required
        id={'email'}
        name={'email'}
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        value={data.createForm.password}
        onChangeText={(text) => updateForm({ password: text })}
        placeholder='Enter your password'
        required
        id={'password'}
        name={'password'}
        secureTextEntry={true}
      />
      <Text style={styles.text}>Pin to share with others</Text>
      <TextInput
        style={styles.input}
        value={data.createForm['share-pin']}
        onChangeText={(text) => updateForm({ 'share-pin': text })}
        placeholder='Enter your share-pin'
        required
        id={'share-pin'}
        name={'share-pin'}
        secureTextEntry={true}
      />
      <Text style={styles.text}>Do you want a private account?</Text>
      <SelectDropdown
        dropdownStyle={styles.drop}
        buttonStyle={styles.dropo}
        buttonTextStyle={styles.drop}
        data={['Yes', 'No']}
        onSelect={(itemValue) => updateForm({ private: itemValue === 'Yes' })}
        buttonTextAfterSelection={(selectedItem) => selectedItem}
      />
      <Text style={styles.text}>Grade Level</Text>
      <TextInput
        style={styles.input}
        value={data.createForm.grade_level}
        onChangeText={(text) => updateForm({ grade_level: text })}
        placeholder='Enter your grade level'
        required
        id={'grade_level'}
        name={'grade_level'}
      />
      <Text style={styles.text}>School</Text>
      <TextInput
        style={styles.input}
        value={data.createForm.school}
        onChangeText={(text) => updateForm({ school: text })}
        placeholder='Enter your high school'
        required
        id={'school'}
        name={'school'}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.bText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dropo: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.05,
    backgroundColor: 'white',
  },
  drop: {
    fontSize: 12,
    color: 'black',
    backgroundColor: 'white',
    // fontFamily: 'ARCO',
  },
  text: {
    color: 'black',
    // fontFamily: 'ARCO',
    fontSize: 16,
  },
  bText: {
    // fontFamily: 'ARCO',
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
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    width: Dimensions.get('window').width * 0.6,
    height: 32,
    color: 'black',
    // fontFamily: 'ARCO',
    fontSize: 12,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 32,
    marginBottom: 20,
  },
});

export default Account;
