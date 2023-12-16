import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Routes/Router.jsx";
import { MantineProvider } from "@mantine/core";
import theme from "./Theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Router />
    </MantineProvider>
  </React.StrictMode>
);
