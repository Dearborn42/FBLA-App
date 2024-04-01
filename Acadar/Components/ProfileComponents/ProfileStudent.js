import React, {useContext} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../../app/_layout';

const ProfileStudent = () => {
  const {currentUser} = useContext(UserContext)
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={{ color: "black" }}>Name: {currentUser.name}</Text>
      <Text>Email: {currentUser.email}</Text>
      <Text>Password: ********</Text>
      <Text>Share Pin: ********</Text>
      <Text>Privacy: {currentUser.private ? 'Yes' : 'No'}</Text>
      <Text>Grade Level: {currentUser.grade_level}</Text>
      <Text>School: {currentUser.school}</Text>
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