import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export default function Nav({ location }) {
    const [isClosed, setIsClosed] = useState(true);
    console.log(location.pathname);

    const { logout } = useAuth({middleware: 'auth'});

    const handleLogout = (e) => {
        e.preventDefault(); 
        logout(); 
    }

    return (
        <nav className={isClosed && "closed"}>
            <ul className={isClosed && "closed"}>
                        <li className={
                        location.pathname == "/" ? "nav--current" : ""
                    }>
                            <NavLink className="navLink" to="/">Kana</NavLink>
                        </li>
                        <li className={
                        location.pathname == "/kanji" ? "nav--current" : ""
                    }><NavLink className="navLink" to="/kanji">Kanji</NavLink></li>
                    
                
                <li
                    className={
                        location.pathname == "/vocabulary" ? "nav--current" : ""
                    }
                >
                    <NavLink className="navLink" to={'/vocabulary'}>Vocabulary</NavLink>
                </li>
                <li
                    className={
                        location.pathname == "/grammar" ? "nav--current" : ""
                    }
                >
                    <NavLink className="navLink" to={'/grammar'}>Grammar</NavLink>
                </li>
            </ul>

            <ul className={isClosed && "closed"}>
                {/* <li
                    className={
                        location.pathname == "/profile" ? "nav--current" : ""
                    }
                >
                    <NavLink className="navLink" to="/profile">
                        Profile
                    </NavLink>
                </li> */}
                <li
                    className={
                        location.pathname == "/notebook" ? "nav--current" : ""
                    }
                >
                    <NavLink className="navLink" to="/notebook">
                        Notebook
                    </NavLink>
                </li>
                <li>
                    <NavLink className="navLink" onClick={handleLogout}>
                        Exit
                    </NavLink>
                </li>
            </ul>
            <div className="button--toggleNav" onClick={() => setIsClosed(!isClosed)}>
                {isClosed && <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#262626" d="M17 9.17a1 1 0 0 0-1.41 0L12 12.71L8.46 9.17a1 1 0 0 0-1.41 0a1 1 0 0 0 0 1.42l4.24 4.24a1 1 0 0 0 1.42 0L17 10.59a1 1 0 0 0 0-1.42"/></svg>}
                {!isClosed && <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#262626" d="m17 13.41l-4.29-4.24a1 1 0 0 0-1.42 0l-4.24 4.24a1 1 0 0 0 0 1.42a1 1 0 0 0 1.41 0L12 11.29l3.54 3.54a1 1 0 0 0 .7.29a1 1 0 0 0 .71-.29a1 1 0 0 0 .05-1.42"/></svg>}
            </div>
        </nav>
    );
}
