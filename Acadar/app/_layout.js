import { Slot } from 'expo-router';
import {useState, createContext} from 'react';
import * as SecureStore from 'expo-secure-store';
const UserContext = createContext();

export default function Root(){
    const [currentUser, setCurrentUser] = useState("");
    const [field, setField] = useState("");
    const [value, setValue] = useState("");
    const [reset, setReset] = useState(false);
    function handleUpdate(text, category){
        setValue(text); 
        setField(category);
    }
    async function add(userField, value){
        const token = await SecureStore.getItemAsync("authToken");
        if(!token) return;
        var body1 = await fetch(`http://172.233.131.223:5000/functions/add/${userField}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json", "auth": token },
            body: JSON.stringify(value)
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            console.log(userField, value);
            updateCurrentUser(userField, value, 0, "add");
        }
    };
    async function remove(userField, name){
        const token = await SecureStore.getItemAsync("authToken");
        if(!token) return;
        if(name.includes(" ")) name = name.split(" ").join("%20")
        var body1 = await fetch(`http://172.233.131.223:5000/functions/remove/${userField}/${name}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json", "auth": token},
            credentials: "include"
        });
        var body1_response = await body1.json();
        if (body1_response.success){
            updateCurrentUser(userField, name, 0, "remove");
        }
    };
    async function update(userField, name){
        const token = await SecureStore.getItemAsync("authToken");
        if(!token) return;
        if(value.trim() === "") return;
        if(name.includes(" ")) name = name.split(" ").join("%20")
        var body1 = await fetch(`http://172.233.131.223:5000/functions/update/${userField}/${name}/${field}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json", "auth": token },
            credentials: "include",
            body: JSON.stringify({"value": value})
        });
        var body1_response = await body1.json();
        console.log(body1_response);
        if (body1_response.success){
            console.log(body1_response);
        }
    };
    function updateCurrentUser(field, value, index, type){
        if(type === "add"){
            setReset(true);
            return setCurrentUser((prev) => {return {...prev, [field]: [...prev[field], value]}})
        }else if(type === "remove"){
            var newArr = currentUser[field].filter((x) => x.name !== value);
            setReset(true);
            return setCurrentUser((prev) => {return {...prev, [field]:newArr}});
        }else{
            if(!index){
                setReset(true);
                return setCurrentUser((prev) => {return {...prev, [field]: value}});
            }else{
                var newArr = currentUser[field];
                newArr[index][type] = value;
                setReset(true);
                return setCurrentUser((prev) => {return {...prev, [field]: newArr}}); 
            }
        }
    }
    return (
    <UserContext.Provider value={{
        handleUpdate, 
        currentUser, 
        setCurrentUser, 
        field, 
        value, 
        add, 
        remove, 
        update,
        updateCurrentUser,
        reset, 
        setReset
    }}>
        <Slot />
    </UserContext.Provider>
  );
}

export {UserContext}