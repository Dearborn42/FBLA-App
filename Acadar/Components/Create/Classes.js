import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {useFonts} from "expo-font"
export default function Classes({ mod, data }) {
  const [loaded] = useFonts({
      MontHeavyDemo: require("../../assets/fonts/HWYGOTH.ttf")
    })
    if(!loaded){
      return null
    }
  const addClass = (year) => {
    data.setCreateForm((prev) => {
      const newClass = { name: '', grade: '' };
      return { ...prev, [year]: [...prev[year], newClass] };
    });
  };

  const removeClass = (year, index) => {
    data.setCreateForm((prev) => {
      const updatedYear = [...prev[year]];
      updatedYear.splice(index, 1);
      return { ...prev, [year]: updatedYear };
    });
  };

  const updateClass = (year, index, field, value) => {
    data.setCreateForm((prev) => {
      const updatedYear = [...prev[year]];
      updatedYear[index][field] = value;
      return { ...prev, [year]: updatedYear };
    });
  };

  function handleSubmit() {
    const {createForm} = data;
    const values = [
      createForm.freshman,
      createForm.sophomore,
      createForm.junior,
      createForm.senior
    ]
    const check = values.every(value => 
      value.length === 0 || value.every(x => x.name !== "" && x.grade !== "")
    );
    if (check) {
      mod((prev) => (prev += 1));
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/blue.png')}
      style={styles.backgroundImage}>
      <ScrollView style={styles.container} contentContainerStyle={["justifyContent"]}>
        {['freshman', 'sophomore', 'junior', 'senior'].map((year) => (
          <View key={year}>
            <Text style={styles.header}>
              {year.charAt(0).toUpperCase() + year.slice(1)}
            </Text>
            {data.createForm[year].map((classItem, index) => (
              <View key={index} style={styles.classContainer}>
                <Text style={styles.text}>Class {index + 1}</Text>
                <TextInput
                  style={styles.input}
                  value={classItem.name}
                  onChangeText={(text) =>
                    updateClass(year, index, 'name', text)
                  }
                  placeholder='Enter class name'
                  required
                  id={year + '_className'}
                  name={year + '_className'}
                />
                <TextInput
                  style={styles.input}
                  value={classItem.grade}
                  onChangeText={(text) =>
                    updateClass(year, index, 'grade', text)
                  }
                  placeholder='Enter class grade'
                  keyboardType='numeric'
                  required
                  id={year + '_classGrade'}
                  name={year + '_classGrade'}
                />
                {/* <Button
                  styles={styles.button}
                  title='Remove'
                  onPress={() => removeClass(year, index)}
                /> */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.button}
                  onPress={() => removeClass(year, index)}>
                  <Text style={styles.bText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            {/* <Button
              styles={styles.button}
              title={`Add ${
                year.charAt(0).toUpperCase() + year.slice(1)
              } Class`}
              onPress={() => addClass(year)}
            /> */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => addClass(year)}>
              <Text style={styles.bText}>{`Add ${
                year.charAt(0).toUpperCase() + year.slice(1)
              } Class`}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleSubmit}>
          <Text style={styles.bText}>Skip/Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  classContainer: {
    textAlign:"center"
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: 'none',
    overflow:"visible",
    marginTop:20,
    marginBottom:40,
    
  },
  header: {
    color: 'black',
    fontFamily: 'MontHeavyDemo',
    
    fontSize: 32,
    textAlign: 'center',
  },
  input: {
    width: "100%",
    height: 40,
    color: 'black',
    fontFamily: 'MontHeavyDemo',
    fontSize: 14,
    backgroundColor: 'white',
    borderRadius: 32,
    marginBottom: 20,
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    padding: 8,
    marginBottom: 16,
  },
  text: {
    color: 'black',
    fontFamily: 'MontHeavyDemo',
    fontSize: 20,
    textAlign:"center"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  bText: {
    fontFamily: 'MontHeavyDemo',
    fontSize: 14,
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
