import React from 'react'
import { View, Text, TextInput, Button} from 'react-native';

const ThreeUpdateForm = ({index, item, remove, update, onChange, categories, styles}) => {
  return (
    <View key={index} style={styles.classContainer}>
        <Text>Art {index + 1}</Text>
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
        <TextInput
        style={styles.input}
        onChangeText={(text) => {onChange(text, categories[2])}}
        onBlur={() => update(item.name)}
        placeholder={item[categories[2]]}
        />
        <Button title="Remove" onPress={() => remove(item.name)} />
    </View>
  )
}

export default ThreeUpdateForm