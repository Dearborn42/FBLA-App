import React, { useContext } from 'react';
import { router } from 'expo-router';
import {UserContext} from "../../app/_layout"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useFonts} from "expo-font"

const CreateForm = ({data}) => {
  const [loaded] = useFonts({
      Comicy: require("../../assets/fonts/Comicy.ttf")
    })
    if(!loaded){
      return null
    }
    const { setCurrentUser } = useContext(UserContext);
    console.log(data.userField);
    const addFunc = () => {
        data.setCreateForm((prev) => {
            const newJob = data.object;
            return { ...prev, [data.userField]: [...prev[data.userField], newJob]};
        });
    };
    const removeFunc = (index) => {
        data.setCreateForm((prev) => {
            const updated = [...prev[data.userField]];
            updated.splice(index, 1);
            return { ...prev, [data.userField]: updated };
        });
    };
    const updateFunc = (index, field, value) => {
        data.setCreateForm((prev) => {
            const updatedList = [...prev[data.userField]];
            const updated = { ...updatedList[index] };
            updated[field] = value;
            updatedList[index] = updated;
            return { ...prev, [data.userField]: updatedList };
        });
    };
    async function handleSubmit(){
      var [length, check] = [0, 0];
      data.createForm[data.userField].forEach((job) => {
        length += Object.keys(data.object).length;
        const values = Object.values(job);
        values.forEach((value) => {
          if(value.trim() != "") check++;
        })
      })
      if(check === length){
        if(!data.last){
            data.mod((prev) => prev += 1);
        }else{
            var body1 = await fetch("http://172.233.131.223:5000/create1", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data.createForm)
            });
            var body1_response = await body1.json();
            if (body1_response.success){
                setCurrentUser(body1_response.user);
                router.replace('/login');
            }
        }
      }
    };
    return (
      <ImageBackground
      source={require('../../assets/blue.png')}
      style={styles.backgroundImage}>
    <View style={styles.container}>
        <Text style={styles.header}>Enter your {data.name}</Text>
        <View>
        {data.createForm[data.userField].map((x, i) => (
            <View key={i} style={styles.classContainer}>
                <Text style={styles.text}>Job {i + 1}</Text>
                    {data.categories.map((y, ph) => (
                        <TextInput
                            style={styles.input}
                            value={x[y]}
                            onChangeText={(text) => updateFunc(i, y, text)}
                            placeholder={data.placeholders[ph]}
                        />
                    ))}
              <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => removeFunc(i)}>
              <Text style={styles.bText}>Remove</Text>
            </TouchableOpacity>
            </View>
        ))}
            <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={()=>addFunc()}>
          <Text style={styles.bText}>Add</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleSubmit}>
          <Text style={styles.bText}>Submit</Text>
        </TouchableOpacity>
    </View> 
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  classContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'none',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'none',
  },
  header: {
    color: 'black',
    fontFamily: 'Comicy',
    fontSize: 32,
    textAlign: 'center',
  },
  input: {
    width: Dimensions.get('window').width * 0.6,
    height: 32,
    color: 'black',
    fontFamily: 'Comicy',
    fontSize: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 32,
    marginBottom: 20,
  },
  text: {
    color: 'black',
    fontFamily: 'Comicy',
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  bText: {
    fontFamily: 'Comicy',
    fontSize: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'white',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    padding: 8,
    marginBottom: 16,
  },
  
});

export default CreateForm