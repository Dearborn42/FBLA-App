import {View,Text, Button,ImageBackground,StyleSheet,TouchableOpacity} from "react-native"
import { UserContext } from "../_layout";
import { useContext } from "react";
import * as SecureStore from 'expo-secure-store';


export default function Page(){
    const {currentUser, setCurrentUser} = useContext(UserContext)
    async function changeMode(){
        var change = currentUser.simpleMode === "1" ? "0" : "1";
        const token = await SecureStore.getItemAsync("authToken");
        if(!token) return;
        const mode_request = await fetch("http://172.233.131.223:5000/studentInfo/update/simpleMode", {
            method: "POST",
            headers: {"Content-Type": "application/json", "auth": token},
            body: JSON.stringify({"value": change})
        })
        const mode_response = await mode_request.json();
        if(mode_response.success){
            console.log("Successfully updated");
            setCurrentUser((prev) => {return {...prev, simpleMode: change}});
        }else{
            console.log("Server error");
        }
    }
    return (
        <ImageBackground style={styles.container} source={ (currentUser.simpleMode==="1")?null:require('../../assets/skyo.png') }>
        <View>
            <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => changeMode()}>
            <Text style={styles.bText}>Accessibility Toggle</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
    )
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