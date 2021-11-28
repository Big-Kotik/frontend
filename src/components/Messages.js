import React, {useState, useEffect, useRef} from 'react';
import authService from "../service/authService";
import {User} from "../classes/User";

let netUrl = "none"
const Messages = ({user, setUser}) => {
    let connection = useRef(null);
    const [message, setMessage] = useState("");
    const [receiverLogin, setReceiverLogin] = useState("");
    useEffect(() => {
        connection.current = new WebSocket("ws://" + netUrl + "/ws");
        connection.current.onmessage = evt => {
            if (user.socketId === null) {
                const socketId = JSON.parse(evt.data)[0];
                const newUser = new User(socketId, user.id, user.login, user.creationTime);
                setUser(newUser)
                return
            }
            //add messages to current user
        }
    }, [])
    return (
        <div>
            <form>
                <textarea value={message} onChange={({target}) => setMessage(target.value)}/>
                <input type="text" value={receiverLogin} onChange={({target}) => setReceiverLogin(target.value)}/>
                <button type="submit" onClick={() => {
                    console.log(user)
                }}>Send message
                </button>
                <button type="submit">Connect to user</button>
            </form>
        </div>
    )
}
export default Messages