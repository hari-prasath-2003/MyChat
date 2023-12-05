import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

import socket from "./services/socket";

import { useDisclosure } from "@mantine/hooks";
import TopNav from "./Layout/mainLayout/TopNav";
import SideNav from "./Layout/mainLayout/SideNav";
import Main from "./Layout/mainLayout/Main";

import { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { useNavigate } from "react-router-dom";
import useCallListner from "./hooks/useCallListner";
import NotificationCall from "./component/shared/NotificationCall";

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const { incomingCaller, acceptCall, rejectCall } = useCallListner();
  const navigate = useNavigate();

  useEffect(() => {
    socket.io.opts.extraHeaders["Authorization"] = document.cookie;
    socket.connect();
    return () => socket.disconnect();
  }, []);

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
        {incomingCaller && (
          <NotificationCall caller={incomingCaller} rejectCall={rejectCall} />
        )}
      </AppShell>
    </ProtectedRoute>
  );
}
