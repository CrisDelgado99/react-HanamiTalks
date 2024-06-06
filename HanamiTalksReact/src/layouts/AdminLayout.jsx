import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import AdminNav from "../components/AdminNav";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminLayout() {
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
            <AdminNav location={location}/>
            <main>
                
                <Outlet />
            </main>

            <footer>

            </footer>
            </>
        
    );
}
