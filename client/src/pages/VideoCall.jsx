import { useEffect, useRef } from "react";
import { Peer } from "peerjs";
import socket from "../services/socket";
import { useLocation } from "react-router-dom";

import userStore from "../app/userStore";
import { Box, Grid, SimpleGrid } from "@mantine/core";
import call from "../services/call";

export default function VideoCall() {
  const userCamera = useRef(null);
  const userCameraStream = useRef(null);
  const remoteUserCamera = useRef(null);
  const activeCall = useRef(null);

  const userId = userStore((state) => state.userId);

  const location = useLocation();

  const role = location.state?.role;
  const receiverId = location.state?.receiverId;

  useEffect(() => {
    (async () => {
      await getUserMedia();

      activeCall.current = new call.VideoCall(
        userId,
        receiverId,
        userCameraStream.current,
        userCamera.current,
        remoteUserCamera.current
      );

      if (role === "caller") {
        activeCall.current.requestVideoCall();
      }
      if (role === "callee") {
        activeCall.current.acceptVideoCall();
      }

      socket.on(
        "videocall-accepted",
        activeCall.current.handleCallAccepted.bind(activeCall.current)
      );
    })();

    return () => {
      socket.off(
        "videocall-accepted",
        activeCall.current.handleCallAccepted.bind(activeCall.current)
      );
    };
  }, []);

  async function getUserMedia() {
    userCameraStream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    userCamera.current.srcObject = userCameraStream.current;
  }

  return (
    <div>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Box>
          <video ref={userCamera} autoPlay muted></video>
        </Box>
        <Box>
          <video ref={remoteUserCamera} autoPlay></video>
        </Box>
      </SimpleGrid>
    </div>
  );
}
