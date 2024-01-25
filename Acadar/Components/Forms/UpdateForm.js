import React from 'react'
import { View, Text, TextInput, Button} from 'react-native';

const UpdateForm = ({index, name, item, remove, update, onChange, categories, styles}) => {
  return (
    <View key={index} style={styles.classContainer}>
        <Text>{name} {index + 1}</Text>
        {categories.map(x => (
            <TextInput
                style={styles.input}
                onChangeText={(text) => {onChange(text, x)}}
                onBlur={() => update(item.name)}
                placeholder={item[x]}
            />
        ))}
        <Button title="Remove" onPress={() => remove(item.name)} />
    </View>
  )
}

export default UpdateForm