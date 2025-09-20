import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; 
import { HashRouter as Router } from "react-router-dom";  // 引入 HashRouter

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router> {/* 使用 HashRouter 包裹 App */}
      <App />
    </Router>
  </React.StrictMode>
);
