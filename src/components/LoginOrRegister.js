import '../css/LoginOrRegister.css';
import React, {useState} from 'react';
import Login from "./Login";
import Register from "./Register";

const LoginOrRegister = ({setUser}) => {
    const [action, setAction] = useState("login")
    if (action === "login") {
        return (
            <Login setAction={setAction} setUser={setUser}/>
        );
    } else {
        return (
            <Register setAction={setAction} setUser={setUser}/>
        );
    }
}
export default LoginOrRegister