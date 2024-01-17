import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const Landing = ({ navigation }) => {
  const loggy = () => {
    navigation.navigate('Login');
  };
  const signy = () => {
    navigation.navigate('Create');
  };
  
  return (
      <View style={styles.container}>
      <Text style={styles.text}>Welcome to Acadar!</Text>
      <Text style={styles.text2}>We put you on the academic radar</Text>

      <Image
        style={styles.image}
        source={ require('../assets/Lando.png') }></Image>
      <Image
        style={styles.image2}
        source={require('../assets/blimpy.png')}></Image>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={signy}>
        <Text style={styles.bText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button2}
        onPress={loggy}>
        <Text style={styles.bText}>Login</Text>
      </TouchableOpacity>
    </View>
    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  image2: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.4,
    resizeMode: 'contain',
    position: 'absolute',
    top: Dimensions.get('window').height * 0.6,
    left: Dimensions.get('window').width * 0.1,
    marginTop:-Dimensions.get('window').height * 0.2,
    zIndex: -1,
  },
  text: {
    backgroundColor: 'transparent',
    // fontFamily: 'ARCO',
    fontSize: 24,
    margin:16,
    textAlign: 'center',
  },
  text2: {
    backgroundColor: 'transparent',
    // fontFamily: 'ARCO',
    fontSize: 12.8,
    textAlign: 'center',
  },
  bText: {
    // fontFamily: 'ARCO',
    fontSize: 16,
    color: 'white',
  },
  button: {
    color: 'black',
    backgroundColor: '#c42430',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.05,
    position: 'absolute',
    top: Dimensions.get('window').height * 0.55,
    left: Dimensions.get('window').width * 0.5,
    marginLeft: -Dimensions.get('window').width * 0.3,
    marginTop: -Dimensions.get('window').height * 0.025,
    borderRadius: 32,
  },
  button2: {
    color: 'black',
    backgroundColor: '#c42430',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.05,
    position: 'absolute',
    top: Dimensions.get('window').height * 0.625,
    left: Dimensions.get('window').width * 0.5,
    marginLeft: -Dimensions.get('window').width * 0.3,
    marginTop: -Dimensions.get('window').height * 0.025,
    borderRadius: 32,
  },
});

export default Landing;
