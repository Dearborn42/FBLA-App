import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ProfileClubs({ user }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
        {user.clubs.map((club, index) => (
          <View key={index} style={styles.classContainer}>
            <Text>Club {index + 1}</Text>
            <Text>Name: {club.name}</Text>
            <Text>Description: {club.desc}</Text>
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
});