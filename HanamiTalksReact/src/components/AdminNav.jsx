import React from "react";
import { NavLink } from "react-router-dom";
import "./../assets/css/admin.css"

export default function AdminNav({ location }) {
    return (
        <nav className="nav--admin">
            <li className={location.pathname == "/admin/adminKanji" ? "nav--current" : ""}>
                <NavLink className="navLink" to='/admin/adminKanji'>
                    Modify Kanji
                </NavLink>
            </li>
            <li className={location.pathname == "/admin/adminVocabulary" ? "nav--current" : ""}>
                <NavLink className="navLink" to='/admin/adminVocabulary'>
                    Modify Vocabulary
                </NavLink>
            </li>
            <li className={location.pathname == "/admin/adminGrammar" ? "nav--current" : ""}>
                <NavLink className="navLink" to='/admin/adminGrammar'>
                    Modify Grammar
                </NavLink>
            </li>
        </nav>
    );
}
