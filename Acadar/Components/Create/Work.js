import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Dimensions,
  ImageBackground,
  TouchableOpacity } from 'react-native';

const Work = ({mod, data}) => {
    const [form, setForm] = useState({work: []});

    const addJob = () => {
        setForm((prev) => {
            const newJob = { "company": '', "desc": ''};
            return { ...prev, work: [...prev.work, newJob]};
        });
    };

    const removeField = (index) => {
        setForm((prev) => {
            const updatedJob = [...prev.work];
            updatedJob.splice(index, 1);
            return { ...prev, work: updatedJob };
        });
    };
    const updateJob = (index, field, value) => {
        setForm((prev) => {
            const updatedJobs = [...prev.work];
            const updatedJob = { ...updatedJobs[index] };
            updatedJob[field] = value;
            updatedJobs[index] = updatedJob;
            return { ...prev, work: updatedJobs };
        });
    };

    function handleSubmit(){
      var length = 0;
      var check = 0;
      form.work.forEach((job) => {
        length += 2;
        const values = Object.values(job);
        values.forEach((value) => {
          if(value.trim() != "") check++;
        })
      })
      if(check === length){
        data((prev) => {return { ...prev, ...form }});
        mod((prev) => prev += 1);
      }
    }
 
    return (
      <ImageBackground
      source={require('../../assets/blue.png')}
      style={styles.backgroundImage}>
    <View style={styles.container}>
        <Text style={styles.header}>Enter your jobs</Text>
        <View>
        {form.work.map((job, index ) => (
            <View key={index} style={styles.classContainer}>
              <Text style={styles.text}>Job {index + 1}</Text>
              <TextInput
                style={styles.input}
                value={job.company}
                onChangeText={(text) => updateJob(index, "company", text)}
                placeholder="Enter company name"
                required
                id={"company"}
                name={"company"}
              />
              <TextInput
                style={styles.input}
                value={job["desc"]}
                onChangeText={(text) => updateJob(index, "desc", text)}
                placeholder="Enter job description"
                required
                id={"desc"}
                name={"desc"}
              />
              <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => removeField(index)}>
              <Text style={styles.bText}>Remove</Text>
            </TouchableOpacity>
            </View>
        ))}
            <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={()=>addJob()}>
          <Text style={styles.bText}>Add Job</Text>
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
    // fontFamily: 'ARCO',
    fontSize: 32,
    textAlign: 'center',
  },
  input: {
    width: Dimensions.get('window').width * 0.6,
    height: 32,
    color: 'black',
    // fontFamily: 'ARCO',
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

export default Work