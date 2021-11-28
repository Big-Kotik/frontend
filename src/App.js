import './css/App.css'
import LoginOrRegister from "./components/LoginOrRegister";
import {useState} from "react";
import Messages from "./components/Messages";

const App = () => {
    const [user, setUser] = useState(null)
    if (user === null) {
        return (
            <div className="app">
                <LoginOrRegister setUser={setUser}/>
            </div>
        );
    }
    return (
        <div className="app">
            <Messages user={user} setUser={setUser}/>
        </div>
    );
}

export default App;
