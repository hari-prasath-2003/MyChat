import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Routes/Router.jsx";
import { MantineProvider } from "@mantine/core";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="light">
      <Router />
    </MantineProvider>
  </React.StrictMode>
);
