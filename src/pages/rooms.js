import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import {io} from 'socket.io-client';
import '../style/style.css';
import {useAuth} from "../app/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";

export default function Rooms() {
    const [message, setMessage] = useState("");
    const [displayMessages, setMessages] = useState([
        {
            username: "",
            color: '#fff',
            text: "La chat è appena iniziata. Saluta gli altri! :)"
        }
    ]);

    let auth = useAuth();
    let roomKeyword = "provaStanza1";

    const writeMessage = (event) => {
        setMessage(event.target.value);
    }

    const sendMessage = () => {
        if (message) {
            socket.emit("room:chat", { keyword: roomKeyword, text: message });
            setMessage("");
        }
    }

    let socket = io('http://localhost:8000', {
        withCredentials: true,
        extraHeaders: {
            'x-auth-token': Cookies.get(process.env.REACT_APP_COOKIENAME)
        },
        transportOptions: {
            polling: {
                extraHeaders: {
                    'x-auth-token': Cookies.get(process.env.REACT_APP_COOKIENAME)
                }
            }
        },
    });

    useEffect(() => {
        socket.on('success', function (data) {

            socket.emit("room:join", {
                keyword: roomKeyword,
            });
        });

        socket.on('room:chat', function (msg) {
            // let messages = document.getElementById("chatRoom");
            // let item = document.createElement('div');
            // item.innerHTML = `<div style="text-align: ${auth.user.username === msg.username ? "right" : "left"}">
            //     <span style="color: ${msg.color}">${msg.username}</span>
            //     <div>${msg.text}</div>
            // </div>`;
            // messages.appendChild(item);
            // window.scrollTo(0, document.body.scrollHeight);
            setMessages(current => [
                ...current,
                {
                    username: msg.username,
                    color: msg.color,
                    text: msg.text
                }]);
            console.log(displayMessages);
        });
    });

    const printMessages = () => {
        let messages = [...displayMessages];
        return messages.map((msg, i) => {
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


                <div style={{maxHeight: "90%", overflowY: "scroll"}} id="chatRoom">
                    {
                        printMessages()
                    }
                </div>
                <div className="field columns is-fixed-bottom ">
                    <div className="column is-four-fifths">
                        <input className="input" name="message" id="message" type="text"
                               value={message} placeholder="Messaggio..."
                               onChange={writeMessage}/>
                    </div>
                    <div className="column is-one-fifth">
                        <div className="control has-icons-left">
                            <input className="input button is-primary" id="sendMessage"
                                   type="submit" value="Invia" disabled={message.length <= 0}
                                   onClick={sendMessage}/>
                            <span className="iconField is-left" style={{paddingTop: "0.25em"}}>
                                    <FontAwesomeIcon icon={faPaperPlane} style={{transform: "scale(1.5)"}}/>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}