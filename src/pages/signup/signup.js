import React from 'react';
import {Circle} from "react-color/lib/components/circle/Circle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";
import '../../style/style.css';

export default class Signup extends React.Component {
    defaultForm = {
        username: '',
        email: '',
        password: '',
        color: '#000000'
    };

    constructor(props) {
        super(props);
        this.state = this.defaultForm;
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
        const {email, password, username, color} = this.state;
        document.getElementById('submitSignup').disabled = true;
        this.props.auth.signup(username, email, password, color);
        document.getElementById('submitSignup').disabled = false;
    }

    render() {
        const {email, password, username} = this.state;
        const enabled = email.length > 0 &&
                        password.length >= 8 &&
                        username.length > 0;
        return (
            <div className="columns" style={{paddingTop: "2em"}}>
                <div className="column is-3">
                {/*TODO: aggiungere robe in fase di registrazione*/}
                </div>
                <div className="column columns is-8 has-text-centered is-centered">
                    <div className="column is-7-desktop is-12-mobile">
                        <form id="signupForm" name="signupForm">
                            <div className="field">
                                <label className="is-one-third labelform" htmlFor="username"> Username </label>
                                <div className="control has-icons-left">
                                    <input className="input is-7" name="username" id="username"
                                           value={this.state.username} required={true}
                                           onChange={this.onInputChange.bind(this)}/>
                                    <span className="iconField is-left">
                                    <FontAwesomeIcon icon={faUser} size="2x"/>
                                </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="is-one-third labelform" htmlFor="email"> Email </label>
                                <div className="control has-icons-left">
                                    <input className="input" name="email" id="email" type="email"
                                           value={this.state.email} required={true}
                                           onChange={this.onInputChange.bind(this)}/>
                                    <span className="iconField is-left">
                                    <FontAwesomeIcon icon={faEnvelope} size="2x"/>
                                </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="is-one-third labelform" htmlFor="password"> Password </label>
                                <div className="control has-icons-left">
                                    <input className="input" name="password" id="password" type="password"
                                           value={this.state.password} required={true}
                                           onChange={this.onInputChange.bind(this)}/>
                                    <span className="iconField is-left">
                                    <FontAwesomeIcon icon={faKey} size="2x"/>
                                </span>
                                </div>
                            </div>
                            <div className="columns field is-grouped is-grouped-centered">
                                <label htmlFor="color" className="column labelform">
                                    Pick your color!
                                    <div style={{
                                        marginLeft: "0",
                                        width: "2em",
                                        height: "2em",
                                        borderRadius: "50%",
                                        border: "1px lightgray solid",
                                        backgroundColor: this.state.color,
                                    }}/>
                                </label>
                                <Circle className="column" onChange={this.handleChangeColor.bind(this)}/>
                            </div>
                            <div className="field is-grouped is-grouped-centered">
                                <p className="control">
                                    <input className="button is-primary" style={{margin: "auto"}}
                                           type="button" value="Registrati!" id="submitSignup"
                                           disabled={!enabled}
                                           onClick={this.submit.bind(this)} />
                                </p>
                                <p className="control">
                                    <input type="button" value="Reset" className="button is-light" onClick={ () => this.setState(this.defaultForm).bind(this) }/>
                                </p>

                            </div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

