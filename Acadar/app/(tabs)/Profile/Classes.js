import React, { useState } from 'react';
import { 
    View, 
    ScrollView, 
    Button, 
    StyleSheet,
    Dimensions,
    ImageBackground,TouchableOpacity,Text
} from 'react-native';
import ProfileClasses from '../../../Components/ProfileComponents/ProfileClasses';
import UpdateClasses from '../../../Components/Update/UpdateClasses';

export default function Page(){
    const [show, setShow] = useState(false);
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
            source={require('../../../assets/blue.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                {!show ? <ProfileClasses /> : <UpdateClasses />}
                <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.button}
                      onPress={() => setShow((prev) => !prev)}>
                      <Text style={styles.bText}>Edit Section</Text>
                    </TouchableOpacity>
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
    fontSize: '1rem',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  bText: {
    fontFamily:"MontHeavyDemo",
    fontSize: 20,
    color: 'black',
  },
  button: {
    marginTop: 16,
    backgroundColor: 'transparent',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '.5rem',
    marginBottom: '1rem',
  },
});