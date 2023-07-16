import { TextField, Button } from "@mui/material"
import { Socket } from "./Socket.js"
import React, {useEffect, useState} from "react"

export default function ChatManager() {
    const [message, setMessage] = useState("");
    const handleResponse = (data) => {
        console.log(data)
    }
    const sendMessage = () => {
        console.log('sending message');
        Socket.emit('test', {data: message});
    }
    const handleChange = (e) => {
        setMessage(e.target.value);
    }   
    useEffect(() => {
        Socket.on('connect', () => {Socket.emit("message", {data: 'I\'m connected!'})});
        Socket.on('message-response', (data) => {handleResponse(data)})
    })
    return (
        <div>
            <p>Messager</p>
            <TextField onChange={(e) => handleChange(e)}/>
            <Button onClick={() => sendMessage()}>Send</Button>
        </div>

    )
}