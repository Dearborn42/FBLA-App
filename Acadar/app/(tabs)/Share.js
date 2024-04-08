import * as React from 'react';
import { View, StyleSheet, Button, Platform, Text, ImageBackground, TouchableOpacity} from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { UserContext } from "../_layout";
import { useContext } from "react";
const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
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