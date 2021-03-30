import React from 'react';
import {Circle} from "react-color/lib/components/circle/Circle";
import '../style/style.css';

// noinspection CheckTagEmptyBody
export default class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            color: '#000000'
        }
    }

    onInputChange(event) {
        let newState = {...this.state};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    handleChangeColor(color) {
        let newState = {...this.state};
        newState.color = color.hex;
        this.setState(newState);
    };

    submit() {
        console.log("clicked!");
    }

    render() {
        return (
            <div>
                <form id="signinForm" name="signinForm">
                    <div>
                        <label htmlFor="username">
                            Username
                            <input name="username" id="username"
                                   value={this.state.username}
                                   onChange={this.onInputChange.bind(this)}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="email">
                            Email
                            <input name="email" id="email" type="email"
                                   value={this.state.email}
                                   onChange={this.onInputChange.bind(this)}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password
                            <input name="password" id="password" type="password"
                                   value={this.state.password}
                                   onChange={this.onInputChange.bind(this)}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="color">
                            Pick your color!
                            <Circle onChange={this.handleChangeColor.bind(this)}/>
                            <div>Colore selezionato:
                                <div style={{
                                    width: "2em",
                                    height: "2em",
                                    borderRadius: "50%",
                                    border: "1px lightgray solid",
                                    backgroundColor: this.state.color
                                }}></div></div>
                        </label>
                    </div>
                    <input type="button" value="Registrati!" onClick={this.submit.bind(this)} />
                </form>
            </div>
        );
    }
}

