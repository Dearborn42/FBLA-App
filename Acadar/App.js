import React, { useState } from 'react';
import { View } from 'react-native';
import Classes from './Components/Create/Classes';
import Account from './Components/Create/Account';
import Clubs from './Components/Create/Clubs';
import Work from './Components/Create/Work';
import Sports from './Components/Create/Sports';
import PerformingArts from './Components/Create/PerformingArts';
import CommunityService from './Components/Create/CommunityService';
import Login from './Components/Login';
import UpdateStudent from './Components/Update/UpdateStudent';
import UpdateClubs from './Components/Update/UpdateClubs';
import UpdateJobs from './Components/Update/UpdateJobs';
import UpdateCommunityServce from './Components/Update/UpdateCommunityService';


const App = () => {
  const studentSetup = [Account, Classes, Clubs, Work, Sports, PerformingArts, CommunityService];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prev, setPrev] = useState({});
  const CurrentForm = studentSetup[currentIndex]
  const testObject = {
        "_id": "658f2fc4d848c59255527323",
        "name": "Andrew Murphy",
        "email": "amurf26@outlook.com",
        "password": "$2b$10$X/b3SW5We.wbHJLUEiiDauKqFWvvFY5mqtEf6wodf8LUuzq4FW5zW",
        "share-pin": "12345",
        "private": true,
        "grade_level": "12",
        "school": "Thunderbird high school",
        "freshman": [
            {
                "name": "Honors Geometry",
                "grade": "99"
            },
            {
                "name": "Honors Biology",
                "grade": "98"
            },
            {
                "name": "Honors English 1-2",
                "grade": "97"
            },
            {
                "name": "French 1-2",
                "grade": "96"
            },
            {
                "name": "Gym",
                "grade": "95"
            },
            {
                "name": "Intro to Coding",
                "grade": "94"
            }
        ],
        "sophomore": [
            {
                "name": "Honors English 3-4",
                "grade": "93"
            },
            {
                "name": "Honors Algebra 2 / Trig",
                "grade": "92"
            },
            {
                "name": "French 3-4",
                "grade": "91"
            },
            {
                "name": "AP World History",
                "grade": "99"
            },
            {
                "name": "AP Comp Sci Princibles",
                "grade": "98"
            },
            {
                "name": "Honors Chemistry",
                "grade": "97"
            }
        ],
        "junior": [
            {
                "name": "AP Calc AB",
                "grade": "96"
            },
            {
                "name": "AP Physics",
                "grade": "95"
            },
            {
                "name": "English 5-6",
                "grade": "94"
            },
            {
                "name": "AP U.S. History",
                "grade": "93"
            },
            {
                "name": "AP Comp Sci A",
                "grade": "92"
            },
            {
                "name": "3D Art",
                "grade": "91"
            }
        ],
        "senior": [
            {
                "name": "AP Calc BC",
                "grade": "99"
            },
            {
                "name": "Econ/Gov",
                "grade": "98"
            },
            {
                "name": "AP Literature",
                "grade": "97"
            },
            {
                "name": "T.A.for Intro to Coding",
                "grade": "96"
            }
        ],
        "clubs": [
            {
                "name": "Theater",
                "desc": "Description for Theater"
            }
        ],
        "work": [
            {
                "company": "Five Guys",
                "desc": "Cooked, cleaned and performed any other required task"
            }
        ],
        "communityService": [
            {
                "name": "Bikes For Foster Kids",
                "desc": "Refurbished bikes for foster kids",
                "hours": "12"
            }
        ],
        "sports": [
            {
                "name": "Basketball",
                "desc": "I was point guard for JV team",
                "award": "National competetor"
            }
        ],
        "perfrormingArts": [
            {
                "name": "Marching Band",
                "desc": "Played percussion",
                "award": "2nd in region"
            }
        ],
    }
  return (
    <View style={{height: "100%", width: "100%"}}>
      <UpdateCommunityServce user={testObject} />
      {/* <UpdateJobs user={testObject} /> */}
      {/* <UpdateClubs user = {testObject} /> */}
      {/* <UpdateStudent user={testObject}/> */}
      {/* <Login /> */}
      {/* {currentIndex != studentSetup.length-1 ? <CurrentForm mod={setCurrentIndex} data={setPrev}/> : 
        <CurrentForm mod={setCurrentIndex} data={prev}/>
      } */}
    </View>
  )
}

export default App