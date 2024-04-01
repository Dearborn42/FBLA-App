import { Slot } from 'expo-router';
import {useState, createContext } from 'react';
const UserContext = createContext();

export default function Root(){
    const [currentUser, setCurrentUser] = useState("");
    const [field, setField] = useState("");
    const [value, setValue] = useState("");
    function handleUpdate(text, category){
        setValue(text); 
        setField(category);
    }
    async function add(userField, value){
        var body1 = await fetch(`http://localhost:5000/functions/add/${userField}`, {
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
        if(name.includes(" ")) name = name.split(" ").join("%20")
        var body1 = await fetch(`http://localhost:5000/functions/remove/${userField}/${name}`, {
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
        if(name.includes(" ")) name = name.split(" ").join("%20")
        var body1 = await fetch(`http://localhost:5000/functions/update/${userField}/${name}/${field}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({"value": value})
        });
        var body1_response = await body1.json();
        console.log(body1_response);
        if (body1_response.success){
            console.log(body1_response);
        }
    };
    return (
    <UserContext.Provider value={{
        handleUpdate, 
        currentUser, 
        setCurrentUser, 
        field, 
        value, 
        add, 
        remove, 
        update
    }}>
        <Slot />
    </UserContext.Provider>
  );
}

export {UserContext}