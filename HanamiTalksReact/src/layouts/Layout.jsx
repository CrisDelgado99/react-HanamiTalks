import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import { useLocation } from "react-router-dom";

export default function Layout() {

    const location = useLocation();

    return (
        <>
            <header className="header--with-nav">
                <h1 className="logo">
                    Hanami<label>Talks</label>
                </h1>
                <Nav location={location} />
            </header>

            <main>
                <Outlet />
            </main>

            <footer>

            </footer>
        </>
    );
}
