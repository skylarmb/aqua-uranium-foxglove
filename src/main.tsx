import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ResponsesContextProvder } from "./contexts/ResponsesContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ResponsesContextProvder>
      <App />
    </ResponsesContextProvder>
  </StrictMode>,
);
