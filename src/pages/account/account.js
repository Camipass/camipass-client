import React from 'react';
import {Circle} from "react-color/lib/components/circle/Circle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faUser} from "@fortawesome/free-solid-svg-icons";
import '../../style/style.css';
import {Controller, useForm} from "react-hook-form";

export default function Account(props) {

    const {userId, username, email, color} = props.auth.user;
    const {register, handleSubmit, formState: {errors}, control, watch} = useForm({
        defaultValues: {
            id: userId,
            username: username,
            email: email,
            password: '',
            color: color
        }
    });

    const submit = (data) => {
        document.getElementById('submitSignup').disabled = true;
        props.auth.update(data.id, data.username, data.email, data.password, data.color);
        document.getElementById('submitSignup').disabled = false;
    }

    return (
        <div className="columns is-centered m-2">
            <div className="column is-5-desktop is-12-mobile" style={{paddingTop: "2em"}}>
                <form id="updateForm" name="updateForm" onSubmit={handleSubmit(submit)}>
                    <div className="field">
                        <label className="is-one-third labelform" htmlFor="username"> Username </label>
                        <div className="control has-icons-left">
                            <input className="input is-7" name="username" id="username"
                                   {...register("username", {
                                       required: {value: true, message: "Username richiesto"},
                                       maxLength: {value: 255, message: "Username più lungo di 255 caratteri!"},
                                       minLength: {value: 1, message: "Username più corto di 1 carattere"}
                                   })}
                            />
                            <span className="iconField is-left">
                                <FontAwesomeIcon icon={faUser} size="2x"/>
                            </span>
                        </div>
                        {errors?.username && <p className="help is-danger">{errors?.username?.message}</p>}
                    </div>
                    <div className="field">
                        <label className="is-one-third labelform" htmlFor="email"> Email </label>
                        <div className="control has-icons-left">
                            <input className="input" name="email" id="email" type="email"
                                   {...register("email", {
                                       required: {value: true, message: "Email richiesta"},
                                       maxLength: {value: 255, message: "Email più lunga di 255 caratteri!"},
                                       minLength: {value: 3, message: "Email più corto di 3 caratteri"}
                                   })}/>
                            <span className="iconField is-left">
                                <FontAwesomeIcon icon={faEnvelope} size="2x"/>
                            </span>
                            {errors?.email && <p className="help is-danger">{errors?.email?.message}</p>}
                        </div>
                    </div>
                    {/*Cambia password? checkbox se si password corrente, validation async e poi nuova password/ripeti password*/}
                    {/*<div className="field">*/}
                    {/*    <label className="is-one-third labelform" htmlFor="password"> Password </label>*/}
                    {/*    <div className="control has-icons-left">*/}
                    {/*        <input className="input" name="password" id="password" type="password"*/}
                    {/*               value={this.state.password} required={true}*/}
                    {/*               onChange={this.onInputChange.bind(this)}/>*/}
                    {/*        <span className="iconField is-left">*/}
                    {/*            <FontAwesomeIcon icon={faKey} size="2x"/>*/}
                    {/*        </span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="columns field is-grouped is-grouped-centered mt-3">
                        <label htmlFor="color" className="column labelform">
                            Scegli il tuo colore!
                            <div style={{
                                marginLeft: "0",
                                width: "2em",
                                height: "2em",
                                borderRadius: "50%",
                                border: "1px lightgray solid",
                                backgroundColor: watch("color"),
                            }}/>
                        </label>
                        <Controller name="color" control={control}
                                    rules={{required: {value: true, message: "Colore richiesto"}}}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Circle
                                            onChange={(e) => onChange(e.hex)}
                                        />
                                    )}
                        />
                        {errors?.color && <p className="help is-danger">{errors?.color?.message}</p>}
                    </div>
                    <div className="field is-grouped is-grouped-centered">
                        <p className="control">
                            <input className="button is-primary" style={{margin: "auto"}}
                                   type="submit" value="Aggiorna i dati" id="submitModify"/>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
