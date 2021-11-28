import '../css/LoginOrRegister.css';
import React from 'react';

const Register = ({setAction}) => {
    return (
        <div className="text-center form-signin-container">
            <main className="form-signin">
                <form>
                    {/*<img className="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>*/}
                    <h1 className="h3 mb-3 fw-normal">Register</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="login" placeholder="name@example.com"/>
                        <label htmlFor="login">Login</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" placeholder="Password"/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="passwordConfirmation"
                               placeholder="Password"/>
                        <label htmlFor="passwordConfirmation">Password confirmation</label>
                    </div>
                    <p>
                        <a href="" className="link-secondary" onClick={(event) => {
                            event.preventDefault()
                            setAction("login");
                        }}>Enter into an existing account</a>
                    </p>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                    {/*<p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>*/}
                </form>
            </main>
        </div>
    );
}
export default Register