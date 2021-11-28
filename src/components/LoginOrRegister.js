import '../css/LoginOrRegister.css';
import React, {useState} from 'react';
import Login from "./Login";
import Register from "./Register";

const LoginOrRegister = () => {
    const [action, setAction] = useState("login")
    if (action === "login") {
        return (
            <Login setAction={setAction}/>
        );
    } else {
        return (
            <Register setAction={setAction}/>
        );
    }
}
export default LoginOrRegister