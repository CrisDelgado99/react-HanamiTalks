import React from "react";

export default function Register() {
    return (
        <>
            <h1>REGISTER</h1>

            <input className="input--email" type="text" placeholder="E-mail" />

            <input className="input--user" type="text" placeholder="Username" />

            <input className="input--password" type="password" placeholder="Password" />

            <input className="input--password" type="password" placeholder="Repeat password" />

            <input className="button--register" type="button" value="REGISTER" />
        </>
    );
}
