import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import UserContext from './UserContext';

const Login = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [form, setForm] = useState({ email: '', password: '' });
  var updateForm = (value) =>
    setForm((prev) => {
      return { ...prev, ...value };
    });
  var handleSubmit = async () => {
    var login = await fetch('http://localhost:5000/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    var login_response = await login.json();
    if (login_response.success) {
      setUser(login_response.user);
      navigation.navigate('App');
    }
  };
  const handleSignUp = () => {
    navigation.navigate('Create');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email:</Text>
      <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(text) => updateForm({ email: text.trim() })}
        placeholder='Enter your email'
        id={'email'}
        name={'email'}
      />
      <Image
        style={styles.image}
        source={{ uri: require('../assets/sky2.svg') }}></Image>
      <Text style={styles.text}>Password:</Text>
      <TextInput
        style={styles.input}
        value={form.password}
        onChangeText={(text) => updateForm({ password: text.trim() })}
        placeholder='Enter your password'
        id={'password'}
        name={'password'}
        secureTextEntry={true}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.bText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ textDecoration: 'underline' }}
        activeOpacity={0.7}
        onPress={handleSignUp}>
        <Text style={styles.bText}>No Account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontFamily: 'ARCO',
    fontSize: '1rem',
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
});

export default Login;
