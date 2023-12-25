import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import Classes from './Components/Create/Classes';
import Account from './Components/Create/Account';


const App = () => {
  const studentSetup = [Account, Classes];
  const [currentIndex, setCurrentIndex] = useState(0);
  const CurrentForm = studentSetup[currentIndex]
  return (
    <View style={{height: "100%", width: "100%"}}>
      <CurrentForm mod={setCurrentIndex}/>
    </View>
  )
}

export default App