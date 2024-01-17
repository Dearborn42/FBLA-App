import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileService({ user }) {
  return (
    <View style={styles.container}>
        {user.communityService.map((service, index) => (
          <View key={index} style={styles.classContainer}>
            <Text>Service {index + 1}</Text>
            <Text>Name: {service.name}</Text>
            <Text>Description: {service.desc}</Text>
            <Text>Hours: {service.hours}</Text>
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
