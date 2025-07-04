import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Buffer } from "buffer"; // 👈 NEW line
window.Buffer = Buffer; // 👈 NEW line

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
