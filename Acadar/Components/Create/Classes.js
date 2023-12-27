import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Classes({mod, data}) {
  const [form, setForm] = useState({
    freshman: [],
    sophomore: [],
    junior: [],
    senior: []
  });

  const addClass = (year) => {
    setForm((prev) => {
      const newClass = { name: '', grade: '' };
      return { ...prev, [year]: [...prev[year], newClass] };
    });
  };

  const removeClass = (year, index) => {
    setForm((prev) => {
      const updatedYear = [...prev[year]];
      updatedYear.splice(index, 1);
      return { ...prev, [year]: updatedYear };
    });
  };

  const updateClass = (year, index, field, value) => {
    setForm((prev) => {
      const updatedYear = [...prev[year]];
      updatedYear[index][field] = value;
      return { ...prev, [year]: updatedYear };
    });
  };

  function handleSubmit(){
    var check = 0;
    var length = 0
    for(let year in form){
      form[year].forEach((hour) => {
        length += 2;
        const values = Object.values(hour);
        values.forEach((value) => {
          if(value.trim() != "") check++;
        })
      });
    }
    if(check == length){
      data((prev) => {return { ...prev, ...form }});
      mod((prev) => prev += 1);
    }
  }

  return (
    <View style={styles.container}>
      {['freshman', 'sophomore', 'junior', 'senior'].map((year) => (
        <View key={year}>
          <Text style={styles.header}>{year.charAt(0).toUpperCase() + year.slice(1)}</Text>
          {form[year].map((classItem, index) => (
            <View key={index} style={styles.classContainer}>
              <Text>Class {index + 1}</Text>
              <TextInput
                style={styles.input}
                value={classItem.name}
                onChangeText={(text) => updateClass(year, index, 'name', text)}
                placeholder="Enter class name"
                required
                id={year+"_className"}
                name={year+"_className"}
              />
              <TextInput
                style={styles.input}
                value={classItem.grade}
                onChangeText={(text) => updateClass(year, index, 'grade', text)}
                placeholder="Enter class grade"
                keyboardType="numeric"
                required
                id={year+"_classGrade"}
                name={year+"_classGrade"}
              />
              <Button title="Remove" onPress={() => removeClass(year, index)} />
            </View>
          ))}
          <Button title={`Add ${year.charAt(0).toUpperCase() + year.slice(1)} Class`} onPress={() => addClass(year)} />
        </View>
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});

