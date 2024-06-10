import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer";

export default function Layout() {

    const location = useLocation();
    const {user, error} = useAuth({middleware: 'auth'});

    console.log(user, error);
    // console.log(middleware);

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

            <Footer/>
        </>
    );
}
