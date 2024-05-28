import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Nav({ location }) {
    console.log(location.pathname);

    const { logout } = useAuth({middleware: 'auth'});

    const handleLogout = (e) => {
        e.preventDefault(); 
        logout(); 
    }

    return (
        <nav>
            <ul>
                
                    
                    
                        <li className={
                        location.pathname == "/kana" ? "nav--current" : ""
                    }>
                            <NavLink className="navLink" to="/kana">Kana</NavLink>
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

            <ul>
                <li
                    className={
                        location.pathname == "/profile" ? "nav--current" : ""
                    }
                >
                    <NavLink className="navLink" to="/profile">
                        Profile
                    </NavLink>
                </li>
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
        </nav>
    );
}
