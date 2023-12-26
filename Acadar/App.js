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
  const [prev, setPrev] = useState({});
  const CurrentForm = studentSetup[currentIndex]
  return (
    <View style={{height: "100%", width: "100%"}}>
      {currentIndex != studentSetup.length-1 ? <CurrentForm mod={setCurrentIndex} data={setPrev}/> : 
        <CurrentForm mod={setCurrentIndex} data={prev}/>
      }
      
    </View>
  )
}

export default App