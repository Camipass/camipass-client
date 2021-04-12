import React, {useState} from "react";
import {faPaperPlane, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function RoomHistory({roomKeyword, onChange, onClick, prevRooms}) {
    const printPrevRooms = () => {
        return prevRooms.map((room, i) => {
            return <div key={i} onClick={(word) => {
                word = room;
                onClick(word);
            }} className="prevroom">
                <span>{room}</span>
            </div>;
        });
    }

    return (
    <div className="column is-one-third-desktop prevroom-side">
        <div style={{padding: "1em",
            position: "sticky",
            left: 0, right: 0, top: 0,
            backgroundColor: "#202225"
        }}>
            <div style={{textAlign: "right"}}>
                <div className="field columns" style={{paddingLeft: "1em"}}>
                    <div className="column is-four-fifths">
                        <input className="input" name="message" id="message" type="text"
                               value={roomKeyword} placeholder="Messaggio..."
                               onChange={onChange}/>
                    </div>
                    <div className="column is-one-fifth">
                        <div className="control has-icons-left">
                            <input className="input button is-primary" id="sendMessage"
                                   type="submit" value="Room" onClick={(word) => {
                                       word = roomKeyword;
                                       onClick(word);
                            }}/>
                            <span className="iconField is-left" style={{paddingTop: "0.25em", marginLeft: "-0.5em"}}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style={{
            paddingTop: "1em"
            }}>
            {printPrevRooms()}
        </div>
    </div>);
}