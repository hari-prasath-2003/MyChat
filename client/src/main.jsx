import React from "react";
import ReactDOM from "react-dom/client";

import AppRoutes from "./AppRoutes.jsx";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="light">
      <AppRoutes />
    </MantineProvider>
  </React.StrictMode>
);
