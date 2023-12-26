import React, { useState } from 'react';
import { View } from 'react-native';
import Classes from './Components/Create/Classes';
import Account from './Components/Create/Account';
import Clubs from './Components/Create/Clubs';
import Work from './Components/Create/Work';
import Sports from './Components/Create/Sports';
import PerformingArts from './Components/Create/PerformingArts';
import CommunityService from './Components/Create/CommunityService';


const App = () => {
  const studentSetup = [Account, Classes, Clubs, Work, Sports, PerformingArts, CommunityService];
  const [currentIndex, setCurrentIndex] = useState(0);
  const CurrentForm = studentSetup[currentIndex]
  return (
    <View style={{height: "100%", width: "100%"}}>
      <CurrentForm mod={setCurrentIndex}/>
    </View>
  )
}

export default App