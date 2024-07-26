import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

import socket from "./services/socket";

import { useDisclosure } from "@mantine/hooks";
import TopNav from "./Layout/mainLayout/TopNav";
import SideNav from "./Layout/mainLayout/SideNav";
import Main from "./Layout/mainLayout/Main";

import { Suspense, useEffect } from "react";
import ProtectedRoute from "./Routes/ProtectedRoute";
import useCallListner from "./hooks/useCallListner";
import CallNotification from "./component/shared/CallNotification";

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const { incomingCaller, showNotification, acceptCall, rejectCall } =
    useCallListner();

  useEffect(() => {
    socket.io.opts.extraHeaders["Authorization"] = document.cookie;
    socket.connect();
    return () => socket.disconnect();
  }, []);

  return (
    <Suspense fallback={<>Loading.....</>}>
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
          {showNotification && (
            <CallNotification
              caller={incomingCaller}
              rejectCall={rejectCall}
              acceptCall={acceptCall}
            />
          )}
        </AppShell>
      </ProtectedRoute>
    </Suspense>
  );
}
