import React from "react";
import { createRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ReactDOM from "react-dom";

export default function Register() {
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const repeatPasswordRef = createRef();

    const [errors, setErrors] = useState([]);
    const { register } = useAuth({
        middleware: 'guest',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        let nickname = nameRef.current.value.length < 5 || nameRef.current.value.length > 30 ? 'invalid' : nameRef.current.value;
        console.log(nickname)

        const newUserData = {
            username: nameRef.current.value,
            nickname: nickname,
            email: emailRef.current.value,
            type: "User",
            kanjiLvl: 1,
            vocabLvl: 1,
            grammarLvl: 1,
            image: "none",
            password: passwordRef.current.value,
            password_confirmation: repeatPasswordRef.current.value,
        };

        register(newUserData, setErrors);
    };

    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
                <h1>REGISTER</h1>

                <input
                    className="input--email"
                    type="text"
                    placeholder="E-mail"
                    ref={emailRef}
                />

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

                <input
                    className="input--password"
                    type="password"
                    placeholder="Repeat password"
                    ref={repeatPasswordRef}
                />

                <input
                    className="button--register"
                    type="submit"
                    value="REGISTER"
                />
            </form>

            {errors && errors.length > 0
                ? ReactDOM.createPortal(
                        <div className="modal-background">
                            <div className="modal--errors">
                                {errors
                                    ? errors.map((error, index) => <p className="modal--errors__errors" key={index}>{error}</p>)
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
