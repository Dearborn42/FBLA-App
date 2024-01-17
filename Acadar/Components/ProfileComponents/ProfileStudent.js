import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileStudent = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Password: ********</Text>
      <Text>Share Pin: ********</Text>
      <Text>Privacy: {user.private ? 'Yes' : 'No'}</Text>
      <Text>Grade Level: {user.grade_level}</Text>
      <Text>School: {user.school}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default ProfileStudent;