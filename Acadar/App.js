import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import dotenv from 'dotenv';
dotenv.config();

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! {process.env.MONGO}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
