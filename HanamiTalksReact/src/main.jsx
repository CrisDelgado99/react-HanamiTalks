import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HanamiTalksProvider } from "./context/HanamiTalksProvider";
import router from "./router";
import "./assets/css/ppal.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HanamiTalksProvider>
            <RouterProvider router={router} />
        </HanamiTalksProvider>
    </React.StrictMode>
);
