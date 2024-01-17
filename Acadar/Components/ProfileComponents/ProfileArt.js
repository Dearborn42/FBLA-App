import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ProfileArt({ user }) {
  return (
    <View style={styles.container}>
      {user.perfrormingArts.map((art, index) => (
        <View key={index} style={styles.classContainer}>
          <Text>Art {index + 1}</Text>
          <Text>Name: {art.name}</Text>
          <Text>Description: {art.desc}</Text>
          <Text>Award: {art.award}</Text>
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
