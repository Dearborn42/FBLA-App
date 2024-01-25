import React from 'react'
import { View, TextInput, Button } from 'react-native';

const TwoAddForm = ({styles, placeholders, newFunc, add}) => {
  return (
    <View>
        <TextInput 
            style={styles.input} 
            type="text" 
            placeholder={placeholders[0]}
            onChangeText={(text) => newFunc("name", text)}
        />
        <TextInput 
            style={styles.input} 
            type="text" 
            placeholder={placeholders[1]}
            onChangeText={(text) => newFunc("desc", text)}
        />
        <Button 
            title="Submit"
            onPress={add}
        />
    </View>
  )
}

export default TwoAddForm