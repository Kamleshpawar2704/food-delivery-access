import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

let entryPoint= ReactDOM.createRoot(document.querySelector(".root"));

entryPoint.render(
    <React.StrictMode>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </React.StrictMode>
);