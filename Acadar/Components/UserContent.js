import {useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserContext = createContext();

function UserContent({children}){
    const [currentUser, setCurrentUser] = useState("");
    const [field, setField] = useState("");
    const [value, setValue] = useState("");
    function handleUpdate(text, category){
        setValue(text); 
        setField(category);
    }
    async function add(userField, value){
        var body1 = await fetch(`http://172.233.131.223:5000/functions/add/${userField}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(value)
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };
    async function remove(userField, name){
        var body1 = await fetch(`http://172.233.131.223:5000/functions/remove/${userField}/${name}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };
    async function update(userField, name){
        if(value.trim() === "") return;
        var body1 = await fetch(`http://172.233.131.223:5000/functions/update/${userField}/${name}/${field}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({"value": value})
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            
        }
    };

    return (
        <UserContext.Provider value={{handleUpdate, currentUser, setCurrentUser, field, value, add, remove, update}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContent;
export { UserContext };