import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';


const Display = ({user, userField, componentFields, nameCounter, nameFields}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {user[userField].map((x, index) => (
        <View key={index} style={styles.classContainer}>
            <Text>{nameCounter} {index + 1}</Text>
            {componentFields.map((y, i) => (
                <Text>{nameFields[i]}: {x[y]}</Text>
            ))}
        </View>
      ))}
    </View>
    </ScrollView>
  )
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

export default Display