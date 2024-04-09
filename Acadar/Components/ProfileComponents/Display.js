import React, {useContext} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../../app/_layout';
import {useFonts} from "expo-font"

function Display({data}){
  const [loaded] = useFonts({
      MontHeavyDemo: require("../../assets/fonts/HWYGOTH.ttf")
    })
    if(!loaded){
      return null
    }
  const {currentUser} = useContext(UserContext)
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {currentUser[data.userField].map((x, index) => (
        <View key={index} style={styles.classContainer}>
            <Text style={styles.header}>{data.nameCounter} {index + 1}</Text>
            {data.componentFields.map((y, i) => (
                <Text style={styles.text}>{data.nameFields[i]}: {x[y]}</Text>
            ))}
        </View>
      ))}
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  bText: {
    // fontFamily: 'ARCO',
    fontSize: 20,
    color: 'black',
    fontFamily: 'MontHeavyDemo',

  },
  button: {
    fontFamily: 'MontHeavyDemo',
    
    backgroundColor: 'white',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    padding: 10,
    marginBottom: 16,
  },
  container: {
    
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 32,
  },
  header: {
    fontFamily: 'MontHeavyDemo',
    fontSize: 32,
    marginBottom: 0,
    
  },
  text: {
    color: 'black',
    fontFamily: 'MontHeavyDemo',
    fontSize: 20,
  },
  input: {
    width: "100%",
    height: 40,
    color: 'black',
    fontFamily: 'MontHeavyDemo',
    fontSize: 14,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 32,
    marginBottom: 8,
  },
});

export default Display