import '../css/LoginOrRegister.css';
import React, {useState} from 'react';
import authService from "../service/authService";
import {User} from "../classes/User";

const Register = ({setAction, setUser}) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const handleRegister = async (event) => {
        event.preventDefault()
        try {
            console.log({
                login,
                password,
                passwordConfirmation
            })
            const res = await authService.register({
                login,
                password,
                passwordConfirmation
            });
            setLogin("");
            setPassword("");
            setPasswordConfirmation("");
            setUser(new User(null, res.id, res.login, res.creationTime))
        } catch (e) {
            //Ignored for now
        }
    }
    return (
        <div className="text-center form-signin-container">
            <main className="form-signin">
                <form onSubmit={handleRegister}>
                    <h1 className="h3 mb-3 fw-normal">Register</h1>
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
                    <div className="form-floating">
                        <input type="password" className="form-control" id="passwordConfirmation"
                               value={passwordConfirmation}
                               onChange={({target}) => setPasswordConfirmation(target.value)}/>
                        <label htmlFor="passwordConfirmation">Password confirmation</label>
                    </div>
                    <p>
                        <a href="" className="link-secondary" onClick={(event) => {
                            event.preventDefault()
                            setAction("login");
                        }}>Enter into an existing account</a>
                    </p>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                </form>
            </main>
        </div>
    );
}
export default Register