import './css/App.css'
import LoginOrRegister from "./components/LoginOrRegister";
import {useState} from "react";

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
            ass
        </div>
    );
}

export default App;
