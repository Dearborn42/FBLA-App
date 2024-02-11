import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

export default function Classes({ mod, data }) {
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
      <View style={styles.container}>
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
          <Text style={styles.bText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
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
    // fontFamily: 'ARCO',
    
    fontSize: 32,
    textAlign: 'center',
  },
  input: {
    width: Dimensions.get('window').width * 0.6,
    height: 32,
    color: 'black',
    // // fontFamily: 'ARCO',
    fontSize: 12,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 32,
    marginBottom: 20,
  },
  text: {
    color: 'black',
    // fontFamily: 'ARCO',
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  bText: {
    // fontFamily: 'ARCO',
    fontSize: 12,
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
