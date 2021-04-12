import React, {useState} from "react";
import {faPaperPlane, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function RoomHistory({roomKeyword, onChange, onClick, prevRooms}) {
    const printPrevRooms = () => {
        return prevRooms.map((room, i) => {
            return <div key={i}>
                <span>{room}</span>
            </div>;
        });
    }

    return (
    <div className="column is-one-third-desktop"  style={{
        position: "fixed",
        height: "calc(100%-4em)",
        padding: "2em",
        backgroundColor: "#202225"
    }}>
        <div>
            <div style={{textAlign: "right"}}>
                <div className="field columns">
                    <div className="column is-four-fifths">
                        <input className="input" name="message" id="message" type="text"
                               value={roomKeyword} placeholder="Messaggio..."
                               onChange={onChange}/>
                    </div>
                    <div className="column is-one-fifth">
                        <div className="control has-icons-left">
                            <input className="input button is-primary" id="sendMessage"
                                   type="submit" value="Room" onClick={onClick}/>
                            <span className="iconField is-left" style={{paddingTop: "0.25em"}}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            {printPrevRooms()}
        </div>
    </div>);
}