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
              <Text>Class {index + 1}</Text>
              <Text>Name: {classItem.name}</Text>
              <Text>Grade: {classItem.grade}</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  classContainer: {
    marginBottom: 20,
  },
});