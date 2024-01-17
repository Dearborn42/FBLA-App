import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileSports({ user }) {
  return (
    <View style={styles.container}>
      {user.sports.map((sport, index) => (
        <View key={index} style={styles.classContainer}>
          <Text>Sport {index + 1}</Text>
          <Text>Name: {sport.name}</Text>
          <Text>Description: {sport.desc}</Text>
          <Text>Award: {sport.award}</Text>
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
