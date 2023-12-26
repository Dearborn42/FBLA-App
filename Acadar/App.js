import React, { useState } from 'react';
import { View } from 'react-native';
import Classes from './Components/Create/Classes';
import Account from './Components/Create/Account';
import Clubs from './Components/Create/Clubs';
import Work from './Components/Create/Work';


const App = () => {
  const studentSetup = [Account, Classes, Clubs, Work];
  const [currentIndex, setCurrentIndex] = useState(0);
  const CurrentForm = studentSetup[currentIndex]
  return (
    <View style={{height: "100%", width: "100%"}}>
      {/* <CurrentForm mod={setCurrentIndex}/> */}
      <Work mod={setCurrentIndex}/>
    </View>
  )
}

export default App