import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileClubs({ user }) {
  return (
    <View style={styles.container}>
        {user.clubs.map((club, index) => (
          <View key={index} style={styles.classContainer}>
            <Text>Club {index + 1}</Text>
            <Text>Name: {club.name}</Text>
            <Text>Description: {club.desc}</Text>
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
});