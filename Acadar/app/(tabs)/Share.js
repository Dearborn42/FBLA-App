import * as React from 'react';
import { View, StyleSheet, Button, Platform, Text, ImageBackground, TouchableOpacity} from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { UserContext } from "../_layout";
import { useContext } from "react";



export default function Page(){
    const [selectedPrinter, setSelectedPrinter] = React.useState();
const {currentUser} = useContext(UserContext)
const fresh = currentUser.freshman.map((x)=>{
          return(`<li>
              <h4>${x.name}: ${x.grade}</h4>
            </li>`
          )
        }).join("")
        const soph = currentUser.sophomore.map((x)=>{
          return(`<li>
              <h4>${x.name}: ${x.grade}</h4>
            </li>`
          )
        }).join("")
        const jun = currentUser.junior.map((x)=>{
          return(`<li>
              <h4>${x.name}: ${x.grade}</h4>
            </li>`
          )
        }).join("")
        const sen = currentUser.senior.map((x)=>{
          return(`<li>
              <h4>${x.name}: ${x.grade}</h4>
            </li>`
          )
        }).join("")
        const clubs = currentUser.clubs.map((x)=>{
          return(`<li>
              <h4>${x.name}</h4>
              <p>${x.desc}</p>
            </li>`
          )
        }).join("")
        const work = currentUser.work.map((x)=>{
          return(`<li>
              <h4>${x.name}</h4>
              <p>${x.desc}</p>
            </li>`
          )
        }).join("")
        const com = currentUser.communityService.map((x)=>{
          return(`<li>
              <h4>${x.name} - ${x.hours}</h4>
              <p>${x.desc}</p>
            </li>`
          )
        }).join("")
        const arts = currentUser.perfrormingArts.map((x)=>{
          return(`<li>
              <h4>${x.name} - ${x.award}</h4>
              <p>${x.desc}</p>
            </li>`
          )
        }).join("")
        const sports = currentUser.sports.map((x)=>{
          return(`<li>
              <h4>${x.name} - ${x.award}</h4>
              <p>${x.desc}</p>
            </li>`
          )
        }).join("")
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
    h1, h2, h3,h4 {
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
    .flex{
      display: flex;
      justify-content: start;
      gap:7rem;
    }
    .vert{
      display: flex;
      flex-direction: column;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${currentUser.name}</h1>
      <p>High School Student</p>
    </header>
    <hr></hr>
    <section>
      <ul>
        <li><strong>High School:</strong> ${currentUser.school} High School, Grade: ${currentUser.grade_level}</li>
      </ul>
      <h3 class="section-title">Classes</h2>
      <ul class ="flex">
        <ul class="vert"><h3>Freshman</h3>${fresh}</ul>
        <ul class="vert"><h3>Sophomore</h3>${soph}</ul>
        <ul class="vert"><h3>Junior</h3>${jun}</ul>
        <ul class="vert"><h3>Senior</h3>${sen}</ul>
      </ul>
      <h3 class="section-title">Clubs</h2>
      <ul class ="flex">
        ${clubs}
      </ul>
      <h3 class="section-title">Performing Arts</h2>
      <ul class ="flex">
        ${arts}
      </ul>
      <h3 class="section-title">Sports</h2>
      <ul class ="flex">
        ${sports}
      </ul>
    </section>
    <section>
      <h2 class="section-title">Experience</h2>
      <h3 class="section-title">Community Service</h2>
      <ul class ="flex">
        ${com}
      </ul>
      <h3 class="section-title">Job Experience</h2>
      <ul class ="flex">
        ${work}
      </ul>
    </section>
    <section>
      <h2 class="section-title">Contact</h2>
      <ul>
        <li>Email: ${currentUser.email}</li>
      </ul>
    </section>
  </div>
</body>
</html>
`;
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