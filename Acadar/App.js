import React, { useState } from 'react';
import { View } from 'react-native';
import Classes from './Components/Create/Classes';
import Account from './Components/Create/Account';
import Clubs from './Components/Create/Clubs';
import Work from './Components/Create/Work';
import Sports from './Components/Create/Sports';


const App = () => {
  const studentSetup = [Account, Classes, Clubs, Work, Sports];
  const [currentIndex, setCurrentIndex] = useState(0);
  const CurrentForm = studentSetup[currentIndex]
  return (
    <View style={{height: "100%", width: "100%"}}>
      {/* <CurrentForm mod={setCurrentIndex}/> */}
      <Sports mod={setCurrentIndex}/>
    </View>
  )
}

export default App