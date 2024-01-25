import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ProfileJobs({ user }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
        {user.work.map((job, index) => (
          <View key={index} style={styles.classContainer}>
            <Text>Job {index + 1}</Text>
            <Text>Company: {job.name}</Text>
            <Text>Description: {job.desc}</Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});