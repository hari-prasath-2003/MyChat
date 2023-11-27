import React from "react";
import ReactDOM from "react-dom/client";

import AppRoutes from "./AppRoutes.jsx";
import { MantineProvider } from "@mantine/core";
import theme from "./Theme.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider defaultColorScheme="light" theme={theme}>
    <AppRoutes />
  </MantineProvider>
);
