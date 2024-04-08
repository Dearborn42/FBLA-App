import Classes from '../Components/Create/Classes';
import Account from '../Components/Create/Account';
import CreateForm from '../Components/Create/CreateForm';
import React, { useState } from 'react';

export default function Page(){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [createForm, setCreateForm] = useState({
      name: '',
      email: '',
      password: '',
      'share-pin': '',
      private: false,
      grade_level: '',
      school: '',
      freshman: [],
      sophomore: [],
      junior: [],
      senior: [],
      clubs: [],
      communityService: [],
      perfrormingArts: [],
      sports: [],
      work: [],
    });
    const studentSetup = [
      Account,
      Classes,
      {
        "mod":setCurrentIndex,
        setCreateForm,
        createForm,
        userField: "work",
        name: "jobs",
        categories: ["name", "desc"],
        object: { "name": '', "desc": ''},
        placeholders: ["Enter company name", "Enter job description"],
        last: false
      },
      {
        "mod":setCurrentIndex,
        setCreateForm,
        createForm,
        userField: "clubs",
        name: "clubs",
        categories: ["name", "desc"],
        object: { "name": '', "desc": ''},
        placeholders: ['Enter club name', 'Enter club description'],
        last: false
      },
      {
        "mod":setCurrentIndex,
        setCreateForm,
        createForm,
        userField: "sports",
        name: "sports",
        categories: ["name", "desc", "award"],
        object: { "name": '', "desc": '', "award": ''},
        placeholders: ["Enter sport name", "Enter sport experience", "Enter sport highest award/achievment"],
        last: false
      },
      {
        "mod":setCurrentIndex,
        setCreateForm,
        createForm,
        userField: "perfrormingArts",
        name: "arts",
        categories: ["name", "desc", "award"],
        object: { "name": '', "desc": '', "award": ''},
        placeholders: ["Enter art name", "Enter art experience", "Enter highest award/achievment"],
        last: false
      },
      {
        "mod":setCurrentIndex,
        setCreateForm,
        createForm,
        userField: "communityService",
        name: "services",
        categories: ["name", "desc", "hours"],
        object: { "name": '', "desc": '', "hours": ''},
        placeholders: ["Enter service name", "Enter service experience", "Enter amount of hours"],
        last: true
      }
    ];
    const CurrentForm = studentSetup[currentIndex];
    return currentIndex < 2 ? (
      <CurrentForm mod={setCurrentIndex} data={{createForm, setCreateForm}} />
    ) : (
      <CreateForm data={CurrentForm} />
    );
}