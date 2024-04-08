import ProfileStudent from '../../../Components/ProfileComponents/ProfileStudent';
import UpdateStudent from "../../../Components/Update/UpdateStudent";
import React, { useState } from 'react';
import { 
    View, 
    ScrollView, 
    Button, 
    StyleSheet,
    Dimensions,
    ImageBackground
} from 'react-native';

export default function Page(){
    const [show, setShow] = useState(false);
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ImageBackground
                source={require('../../../assets/blue.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    {!show ? <ProfileStudent /> : <UpdateStudent />}
                    <Button onPress={() => setShow((prev) => !prev)} title="Edit Section"></Button>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
    fontFamily: 'ARCO',
    fontSize: '2rem',
    textAlign: 'center',
  },
  input: {
    width: Dimensions.get('window').width * 0.6,
    height: '2rem',
    color: 'black',
    fontFamily: 'ARCO',
    fontSize: '.75rem',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: '2rem',
    marginBottom: 20,
  },
  text: {
    color: 'black',
    fontFamily: 'ARCO',
    fontSize: '1rem',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  bText: {
    fontFamily: 'ARCO',
    fontSize: '.75rem',
    color: 'black',
  },
  button: {
    backgroundColor: 'white',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '2rem',
    padding: '.5rem',
    marginBottom: '1rem',
  },
});