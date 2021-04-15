import React, {useEffect, useState} from 'react';
import _, { map } from "underscore";
import '../style/style.css';
import {useAuth} from "../app/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faPlus} from "@fortawesome/free-solid-svg-icons";
import {socket} from "../services/socket";
import RoomHistory from "../components/roomHistory";

export default function Rooms() {
    const [prevRooms, setRooms] = useState([]);
    const [roomKeyword, setRoomKeyword] = useState("");
    const [currentkeyword, setCurrentKeyword] = useState("camipass-world");
    const [message, setMessage] = useState("");
    const [displayMessages, setMessages] = useState([]);
    let auth = useAuth();

    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            socket.emit("room:join", {
                keyword: currentkeyword,
            });
        });
        socket.on('room:chat', function (msg) {
            setMessages(current => [...displayMessages, {
                username: msg.username,
                color: msg.color,
                text: msg.text,
                info: false
            }]);
        });

        socket.on('roomInfo', function (event) {
            setMessages(current => [...displayMessages, {
                username: event.username,
                color: event.color,
                text: event.text,
                info: true
            }]);
        });
    })

    useEffect( () => () => {
        console.log('leaving');
        socket.emit('room:leave', {
            keyword: currentkeyword,
        });

    }, [currentkeyword]);

    const writeMessage = (event) => {
        setMessage(event.target.value);
    }

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit("room:chat", { keyword: currentkeyword, text: message });
            setMessage("");
            setMessages(current => [...displayMessages, {
                username: auth.user.username,
                color: auth.user.color,
                text: message,
                info: false
            }]);
        }
    }



    const newRoom = (newRoom) => {
        socket.emit('room:leave', {
            keyword: currentkeyword,
        });

        socket.emit("room:join", {
            keyword: newRoom,
        });
        setRoomKeyword(newRoom);
        setCurrentKeyword(newRoom);
        setRooms(current => [newRoom, ..._.filter(prevRooms, (item) => {
            return item !== newRoom;
        })]);
        setMessages([]);
    }

    const changeRoomKeyword = (event) => {
        setRoomKeyword(event.target.value);
    }

    const printMessages = () => {
        return displayMessages.map((msg, i) => {
            let avatar = `https://eu.ui-avatars.com/api/?name=${msg.username}&background=${msg.color.substr(1)}&size=40`;

            let mex = (msg.info) ? (
                <div key={i}>
                    <div>
                        <div className="infomex">
                            <span style={{color: msg.color}}>{msg.username}</span>&nbsp;{msg.text}
                        </div>
                    </div>
                </div>
            ) : (
                <div key={i} className="message">
                    <div style={{textAlign: "right", paddingTop: "0.5em", userSelect: "none"}}>
                        <img src={avatar} style={{borderRadius: "50%"}} alt="User Avatar"/>
                    </div>
                    <div>
                        <span style={{color: msg.color}}>{msg.username}</span>
                        <div>{msg.text}</div>
                    </div>
                </div>
            );

            return mex;
        });
    }

    return (
        <div className="columns">
            <div className="prevroom-btn" onClick={() => {
                document.getElementById("prevroom-side").classList.toggle("prevroom-side-open");
            }}>
                <FontAwesomeIcon icon={faPlus}/> &nbsp; Nuova Room
            </div>
            <RoomHistory roomKeyword={roomKeyword} onClick={newRoom} prevRooms={prevRooms}
                         onChange={changeRoomKeyword} />

            <div className="column is-two-thirds-desktop is-offset-one-third-desktop is-12-mobile" style={{padding: "2em"}}>
                <div id="roomName">
                    {currentkeyword}
                </div>

                <div style={{paddingBottom: "5em"}}>
                    <div> <div> <div className="infomex">La chat è appena iniziata. Saluta gli altri! :)</div> </div> </div>
                    { printMessages() }
                </div>

            </div>
            <form onSubmit={sendMessage} style={{
                position: "fixed",
                minHeight: "4em",
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

    );
}
