import React from "react";
import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import LoginSwitch from "../components/LoginSwitch";
import './../assets/css/logReg.css';

export default function LoginRegister() {
    const [switchClicked, setSwitchClicked] = useState(false);

    const handleClick = () => {
        setSwitchClicked(!switchClicked)
      }
    return (
        <>
        <div className="container--row container--switch">
            <p>LOGIN</p>
        <LoginSwitch switchClicked={switchClicked} handleClick={handleClick}/>
        <p>REGISTER</p>
        </div>
            <div className={switchClicked ? "card--rotating rotated logReg" : "card--rotating logReg"}>
                <div className="card--full">
                    <div className="card--full__front front">
                      <Login />
                    </div>
                    <div className="card--full__back back">
                      <Register />
                    </div>
                </div>
            </div>
        </>
    );
}
