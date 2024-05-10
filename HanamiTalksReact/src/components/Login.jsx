import React from "react";
import KanjiForm from "./KanjiForm";

export default function Login() {
    return (
        <>
            <h1>LOGIN</h1>
            <input className="input--user" type="text" placeholder="Username"></input>
            <input className="input--password" type="password" placeholder="Password" />
            <input className="button--login" type="button" value="LOGIN" />
        </>
    );
}
