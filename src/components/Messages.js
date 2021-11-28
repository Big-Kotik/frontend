import React, {useState, useEffect, useRef} from 'react';
import authService from "../service/authService";
import {User} from "../classes/User";
import {openDB, deleteDB, wrap, unwrap} from 'idb';

let netUrl = "206.189.7.80:8081"
const Messages = ({user, setUser}) => {
    let connection = useRef(null);
    let db = useRef(null);
    const [message, setMessage] = useState("");
    const [receiverLogin, setReceiverLogin] = useState("");
    const [messages, setMessages] = useState([{
        senderLogin: "aba",
        text: "sas"
    }]);
    useEffect(() => {
        const asyncEffect = async () => {
            connection.current = new WebSocket("ws://" + netUrl + "/ws");
            connection.current.onmessage = async ({data}) => {
                if (user.socketId === null) {
                    const socketId = JSON.parse(data)[0];
                    const newUser = new User(socketId, user.id, user.login, user.creationTime)
                    setUser(newUser)
                    await authService.saveSockedId({socketId})
                    return
                }
                //add messages to current user
                const messagesData = JSON.parse(data);
                setMessages(messagesData);
            }
            connection.current.onerror = (error) => {
                console.log(error.message)
            }
        }
        asyncEffect();
    }, [])
    useEffect(() => {
        const open = async () => {
            db.current = await openDB(user.login, 1);
            console.log("DB opened");
        }
        open();
    }, [])
    const handleNewMessage = async (event) => {
        event.preventDefault()
    }
    return (
        <div>
            <form>
                <textarea value={message} onChange={({target}) => setMessage(target.value)}/>
                <input type="text" value={receiverLogin} onChange={({target}) => setReceiverLogin(target.value)}/>
                <button name="send">Send message
                </button>
            </form>
            <ul>
                {
                    messages.map(m => (
                        <li>
                            Sender: {m.senderLogin}, Text: {m.text}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default Messages