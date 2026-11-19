import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/modak/latin-400.css";
import "@fontsource/fredoka/latin-400.css";
import "@fontsource/fredoka/latin-500.css";
import "@fontsource/fredoka/latin-600.css";
import "@fontsource/fredoka/latin-700.css";
import "@fontsource/caveat/latin-400.css";
import "@fontsource/caveat/latin-500.css";
import { App } from "./App";
import "./design/system.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
