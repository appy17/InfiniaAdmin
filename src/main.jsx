// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";


ReactDOM.createRoot(document.getElementById("root")).render(

  <HashRouter>
     <>
      <App />
      <Toaster />
    </>
   </HashRouter>
  
);
