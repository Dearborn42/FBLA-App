import React from 'react'
import { View, TextInput, Button} from 'react-native';

const AddForm = ({styles, placeholders, categories, newFunc, add}) => {
    return (
        <View>
            {placeholders.map((x, i) => (
                <TextInput 
                    style={styles.input} 
                    type="text" 
                    placeholder={x}
                    onChangeText={(text) => newFunc(categories[i], text)} 
                />
            ))}
            <Button 
                title="Submit"
                onPress={() => add()}
            />
        </View>
    )
}

export default AddForm