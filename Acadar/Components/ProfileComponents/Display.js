import React, {useContext} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../UserContent';

const Display = ({userField, componentFields, nameCounter, nameFields}) => {
  const {currentUser} = useContext(UserContext)
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {currentUser[userField].map((x, index) => (
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