import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Work = ({mod}) => {
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

    const handleSubmit = async () => {
        var body4 = await fetch("http://localhost:5000/create4", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({form})
        });
        var body4_response = await body4.json();
        if (body4_response.success){
            mod((prev) => prev += 1);
        }
    }

    return (
    <View style={styles.container}>
        <Text style={styles.header}>Enter your jobs</Text>
        <View>
        {form.work.map((job, index ) => (
            <View key={index} style={styles.classContainer}>
              <Text>Job {index + 1}</Text>
              <TextInput
                style={styles.input}
                value={job.company}
                onChangeText={(text) => updateJob(index, company, text)}
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
              <Button title="Remove" onPress={() => removeField(index)} />
            </View>
        ))}
            <Button title={`Add Job`} onPress={() => addJob()} />
        </View>
        <Button title="Submit" onPress={handleSubmit} />
    </View> 
  )
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

export default Work