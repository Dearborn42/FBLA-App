import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileJobs({ user }) {
  return (
    <View style={styles.container}>
        {user.work.map((job, index) => (
          <View key={index} style={styles.classContainer}>
            <Text>Job {index + 1}</Text>
            <Text>Company: {job.company}</Text>
            <Text>Description: {job.desc}</Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
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