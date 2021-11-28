import React, {useState, useEffect} from 'react';

let netUrl = "none"
const Messages = ({user, setUser}) => {
    let connection;
    useEffect(() => {
/*        //establish connection and get id from webSocket
        connection = new WebSocket(`wss://${netUrl}`); // TODO:useRef
        let sockedIdReceived = false;
        connection.onmessage = ev => {
            if (!sockedIdReceived) {
                const newUser = {
                    ...user,
                    sockedId: ev.data[0]
                }//TODO ???
                sockedIdReceived = true
                return
            }

        }*/
    }, [])
}
export default Messages