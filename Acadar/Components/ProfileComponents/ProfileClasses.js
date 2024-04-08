import React, {useContext} from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { UserContext } from '../../app/_layout';

export default function ProfileClasses() {
  const {currentUser} = useContext(UserContext)
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {['freshman', 'sophomore', 'junior', 'senior'].map((year) => (
        <View key={year}>
          <Text style={styles.header}>{year.charAt(0).toUpperCase() + year.slice(1)}</Text>
          {currentUser[year].map((classItem, index) => (
            <View key={index} style={styles.classContainer}>
              <Text style={styles.text}>Class {index + 1}</Text>
              <Text style={styles.text}>Name: {classItem.name}</Text>
              <Text style={styles.text}>Grade: {classItem.grade}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    
  },
  header: {
    fontFamily: 'MontHeavyDemo',
    fontSize: 32,
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