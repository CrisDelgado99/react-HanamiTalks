import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        
            <>
                <header className="header--simple">
                    <h1 className="logo">
                        Hanami<label>Talks</label>
                    </h1>
                </header>

                <main className="auth">
                    <Outlet />
                </main>
            </>
        
    );
}
