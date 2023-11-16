import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import TopNav from "./Layout/mainLayout/TopNav";
import SideNav from "./Layout/mainLayout/SideNav";
import Main from "./Layout/mainLayout/Main";

import { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import socket from "./services/socket";

export default function App() {
  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {}, []);

  return (
    <ProtectedRoute>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <TopNav SideNavOpened={opened} toggle={toggle} />
        <SideNav />
        <Main />
      </AppShell>
    </ProtectedRoute>
  );
}
