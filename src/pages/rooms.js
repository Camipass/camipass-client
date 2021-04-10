import React, {useEffect, useState} from 'react';
import '../style/style.css';
import {useAuth} from "../app/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {socket} from "../services/socket";

export default function Rooms() {

    const [message, setMessage] = useState("");
    const [displayMessages, setMessages] = useState([
        {
            username: "",
            color: '#fff',
            text: "La chat è appena iniziata. Saluta gli altri! :)"
        }
    ]);
    let roomKeyword = "provaStanza1";
    let auth = useAuth();

    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            socket.emit("room:join", {
                keyword: roomKeyword,
            });
        })
    })



    const writeMessage = (event) => {
        setMessage(event.target.value);
    }

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit("room:chat", { keyword: roomKeyword, text: message });
            setMessage("");
            setMessages(current => [...displayMessages, {
                username: auth.user.username,
                color: auth.user.color,
                text: message
            }])
        }
    }

    socket.on('room:chat', function (msg) {
        setMessages(current => [...displayMessages, {
                username: msg.username,
                color: msg.color,
                text: msg.text
            }])
        console.log(displayMessages);
    });

    const printMessages = () => {
        return displayMessages.map((msg, i) => {
            return <div key={i}>
                <div style={{
                    textAlign: (auth.user.username === msg.username) ?
                        "right" : "left"
                }}>
                    <span style={{color: msg.color}}>{msg.username}</span>
                    <div>{msg.text}</div>
                </div>
            </div>
        });
    }

    return (
        <div className="columns is-text-centered is-centered" style={{paddingTop: "2em"}}>
            <div className="column is-three-fifths">


                <div style={{paddingBottom: "5em"}}>
                    {
                        printMessages()
                    }
                </div>
                <form onSubmit={sendMessage} style={{
                    position: "fixed",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    padding: "1em",
                    backgroundColor: "#393B41"
                }}>
                    <div className="field columns">
                        <div className="column is-four-fifths">
                            <input className="input" name="message" id="message" type="text"
                                   value={message} placeholder="Messaggio..."
                                   onChange={writeMessage}/>
                        </div>
                        <div className="column is-one-fifth">
                            <div className="control has-icons-left">
                                <input className="input button is-primary" id="sendMessage"
                                       type="submit" value="Invia" disabled={message.length <= 0}/>
                                <span className="iconField is-left" style={{paddingTop: "0.25em"}}>
                                    <FontAwesomeIcon icon={faPaperPlane} style={{transform: "scale(1.5)"}}/>
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}
