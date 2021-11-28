import '../css/LoginOrRegister.css';
import React, {useState} from 'react';
import authService from "../service/authService";
import {User} from "../classes/User";

const Login = ({setAction, setUser}) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            console.log({
                login,
                password
            })
            const res = await authService.login({
                login,
                password
            });
            setLogin("");
            setPassword("");
            setUser(new User(null, res.id, res.login, res.creationTime))
        } catch (e) {
            //Ignored for now
        }
    }
    return (
        <div className="text-center form-signin-container">
            <main className="form-signin">
                <form onSubmit={handleLogin}>
                    <h1 className="h3 mb-3 fw-normal">Sign in</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="login" value={login}
                               onChange={({target}) => setLogin(target.value)}/>
                        <label htmlFor="login">Login</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" value={password}
                               onChange={({target}) => setPassword(target.value)}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <p>
                        <a href="" className="link-secondary" onClick={(event) => {
                            event.preventDefault()
                            setAction("register");
                        }}>Create new account</a>
                    </p>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                </form>
            </main>
        </div>
    );
}
export default Login