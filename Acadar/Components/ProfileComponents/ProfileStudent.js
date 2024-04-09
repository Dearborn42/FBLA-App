import React, {useContext} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../../app/_layout';
import { Link } from 'expo-router';

const ProfileStudent = () => {
  const {currentUser} = useContext(UserContext)
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.text}>Name: {currentUser.name}</Text>
      <Text style={styles.text}>Email: {currentUser.email}</Text>
      <Text style={styles.text}>Password: ********</Text>
      <Text style={styles.text}>Grade Level: {currentUser.grade_level}</Text>
      <Text style={styles.text}>School: {currentUser.school}</Text>
      <Link 
            activeOpacity={0.7}
            style={{ ...styles.bText}}
            href="/"
        >
            Logout
        </Link>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  bText: {
    // fontFamily: 'ARCO',
    fontSize: 20,
    color: 'black',
    fontFamily: 'MontHeavyDemo',

  },
  button: {
    fontFamily: 'MontHeavyDemo',
    
    backgroundColor: 'white',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    padding: 10,
    marginBottom: 16,
  },
  container: {
    
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 32,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  text: {
    color: 'black',
    fontFamily: 'MontHeavyDemo',
    fontSize: 20,
  },
  input: {
    width: "100%",
    height: 40,
    color: 'black',
    fontFamily: 'MontHeavyDemo',
    fontSize: 14,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 32,
    marginBottom: 8,
  },
});

export default ProfileStudent;