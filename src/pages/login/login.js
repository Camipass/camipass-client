import React from 'react';
import '../../style/style.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    onInputChange(event) {
        let newState = {...this.state};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    submit() {
        const {email, password} = this.state;
        document.getElementById('submitLogin').disabled = true;
        this.props.auth.signin(email, password);
        document.getElementById('submitLogin').disabled = false;
    }

    render() {
        return (
            <div className="columns has-text-centered is-centered" style={{paddingTop: "2em"}}>
                <div className="column is-5">
                    <form id="signinForm" name="signinForm">
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
                        <div className="field">
                            <p className="control" style={{textAlign: "center"}}>
                                <input className="button is-primary"
                                       type="button" value="Login" id="submitLogin"
                                       onClick={this.submit.bind(this)} />
                            </p>

                        </div>
                        <div className="field">
                            <p className="control" style={{textAlign: "right"}}>
                                Non ti sei ancora registrato? <Link to={"/signin"}>Rimedia subito</Link>.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}