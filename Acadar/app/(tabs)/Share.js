import * as React from 'react';
import { View, StyleSheet, Button, Platform, Text, ImageBackground, TouchableOpacity} from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { UserContext } from "../_layout";
import { useContext } from "react";
const html = `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>High School Student Resume</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2, h3 {
      margin: 0;
    }
    section {
      margin-bottom: 20px;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin-bottom: 10px;
    }
    .section-title {
      font-size: 24px;
      margin-bottom: 10px;
    }
    .sub-section-title {
      font-size: 18px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>John Doe</h1>
      <p>High School Student</p>
    </header>
    <hr></hr>
    <section>
      <h2 class="section-title">Education</h2>
      <ul>
        <li><strong>High School:</strong> XYZ High School, City, State (Year of Graduation)</li>
      </ul>
    </section>
    <section>
      <h2 class="section-title">Experience</h2>
      <h3 class="sub-section-title">Internship at ABC Company</h3>
      <ul>
        <li>Description of responsibilities and accomplishments during the internship.</li>
      </ul>
    </section>
    <section>
      <h2 class="section-title">Skills</h2>
      <ul>
        <li>Technical Skills:</li>
        <ul>
          <li>Skill 1</li>
          <li>Skill 2</li>
          <li>Skill 3</li>
        </ul>
        <li>Soft Skills:</li>
        <ul>
          <li>Skill A</li>
          <li>Skill B</li>
          <li>Skill C</li>
        </ul>
      </ul>
    </section>
    <section>
      <h2 class="section-title">Extracurricular Activities</h2>
      <ul>
        <li>Activity 1</li>
        <li>Activity 2</li>
        <li>Activity 3</li>
      </ul>
    </section>
    <section>
      <h2 class="section-title">References</h2>
      <ul>
        <li>Name of Reference 1, Position, Contact Information</li>
        <li>Name of Reference 2, Position, Contact Information</li>
      </ul>
    </section>
  </div>
</body>
</html>
`;

export default function Page(){
    const [selectedPrinter, setSelectedPrinter] = React.useState();
const {currentUser} = useContext(UserContext)

  async function print(){
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  async function printToFile(){
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await Sharing.shareAsync(uri, { UTI: '.jpg', mimeType: 'application/jpg' });
  };

  async function selectPrinter(){
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  async function execute() {
    const { uri } = await Print.printToFileAsync({ html });
    Sharing.shareAsync(uri);
  }

  return (
    <ImageBackground style={styles.container} source={ (currentUser.simpleMode==="1")?null:require('../../assets/skyo.png') }>
      
      <View>
      <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={print}>
            <Text style={styles.bText}>Print</Text>
        </TouchableOpacity>
      {Platform.OS === 'ios' && (
        <>
            <View style={styles.spacer} />
            <Button title="Select printer" onPress={selectPrinter} />
            <View style={styles.spacer} />
            {selectedPrinter ? (
                <>
                    <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
                    <View style={styles.spacer} />
                </>
            ) : undefined}
        </>
      )}
      <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => execute()}>
            <Text style={styles.bText}>Share</Text>
        </TouchableOpacity>
    </View>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'column',
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: 'center',
  },bText: {
    // fontFamily: 'ARCO',
    fontSize: 20,
    color: 'black',
    fontFamily: 'MontHeavyDemo',

  },
  button: {
    fontFamily: 'MontHeavyDemo',
    
    backgroundColor: 'white',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    padding: 10,
    marginBottom: 16,
  },
});