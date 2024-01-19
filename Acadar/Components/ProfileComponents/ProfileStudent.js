import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ProfileStudent = ({ user }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={{ color: "black" }}>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Password: ********</Text>
      <Text>Share Pin: ********</Text>
      <Text>Privacy: {user.private ? 'Yes' : 'No'}</Text>
      <Text>Grade Level: {user.grade_level}</Text>
      <Text>School: {user.school}</Text>
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
});

export default ProfileStudent;