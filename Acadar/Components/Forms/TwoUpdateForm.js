import React from 'react'
import { View, Text, TextInput, Button} from 'react-native';

const TwoUpdateForm = ({index, styles, onChange, item, update, remove, categories}) => {
  return (
    <View key={index} style={styles.classContainer}>
      <Text>Job {index + 1}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {onChange(text, categories[0])}}
        onBlur={() => update(item.name)}
        placeholder={item[categories[0]]}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => {onChange(text, categories[1])}}
        onBlur={() => update(item.name)}
        placeholder={item[categories[1]]}
      />
      <Button title="Remove" onPress={() => remove(item.name)} />
    </View>
  )
}

export default TwoUpdateForm