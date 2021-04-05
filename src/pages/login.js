import React from 'react';
import '../style/style.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";
import {User} from "../services/user";
import swal from "sweetalert2";
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
        document.getElementById('submitLogin').disabled = true;

        User.login(this.state)
            .then(res => {
                swal.fire({
                    titleText: "Registrazione completata!",
                    text: "Benvenuto nel mondo Camipass!",
                    icon: "success",
                    background: "#393B41",
                    confirmButtonColor: '#F95F72'
                })
                    .then(() => window.location = "/");
            })
            .catch(err => {
                if (err.response.status === 410)
                    swal.fire({
                        titleText: "Username già esistente",
                        text: "Qualcuno è arrivato prima di te :-/",
                        icon: "error",
                        background: "#393B41",
                        confirmButtonColor: '#F95F72'
                    });
                else if (err.response.status === 411)
                    swal.fire({
                        title: "Email già esistente",
                        text: "L'indirizzo email è stato già usato. Prova a entrare con quella email.",
                        icon: "error",
                        background: "#393B41",
                        confirmButtonColor: '#F95F72'
                    });
                else swal.fire({
                        titleText: "Qualcosa è andato storto :-/",
                        text: "Aggiorna la pagina e riprova.",
                        icon: "error",
                        background: "#393B41",
                        confirmButtonColor: '#F95F72'
                    });
            });
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
                                       value={this.state.email}
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
                                       value={this.state.password}
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