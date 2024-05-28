import React from "react";
import { createRef, useState } from "react";
import axiosClient from "../config/axios";
import ReactDOM from "react-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const nameRef = createRef();
    const passwordRef = createRef();

    const [errors, setErrors] = useState([]);
    const { login } = useAuth({
        middleware:'guest',
        url: '/'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const existingUserData = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        };

        login(existingUserData, setErrors)
    };

    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
                <h1>LOGIN</h1>
                <input
                    className="input--user"
                    type="text"
                    placeholder="Username"
                    ref={nameRef}
                />
                <input
                    className="input--password"
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                <input className="button--login" type="submit" value="LOGIN" />
            </form>

            {errors && errors.length > 0
                ? ReactDOM.createPortal(
                      <div className="modal-background">
                          <div className="modal--errors">
                              {errors
                                  ? errors.map((error, index) => <p key={index}>{error}</p>)
                                  : null}

                              <input
                                  type="submit"
                                  value="Got it!"
                                  onClick={() => setErrors([])}
                              />
                          </div>
                      </div>,
                      document.body
                  )
                : null}
        </>
    );
}
