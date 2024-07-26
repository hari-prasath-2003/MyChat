import { useLocation } from "react-router-dom";

import userStore from "../app/userStore";

import { ActionIcon, Box, Flex, SimpleGrid } from "@mantine/core";
import { MdCallEnd } from "react-icons/md";

import useCall from "../hooks/useCall";
import UserWebCam from "../component/VideoCall/UserWebCam";
import { useState } from "react";

export default function VideoCall() {
  const userId = userStore((state) => state.userId);
  const userName = userStore((state) => state.userName);
  const userProfile = userStore((state) => state.userProfile);

  const user = { id: userId, name: userName, profile: userProfile };

  const [userMediaStream, setUserMediaStream] = useState(null);

  const location = useLocation();
  const role = location.state?.role;
  const receiverId = location.state?.receiverId;

  const { remoteUserMedia, endCall } = useCall(
    user,
    receiverId,
    role,
    userMediaStream
  );

  return (
    <Box h={"100%"}>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Box>
          <UserWebCam setVideoStream={setUserMediaStream} />
        </Box>
        <Box>
          <video ref={remoteUserMedia} autoPlay></video>
        </Box>
      </SimpleGrid>
      <Flex
        align={"center"}
        justify={"center"}
        pos={"absolute"}
        bottom={0}
        w={"100%"}
      >
        <ActionIcon
          p={5}
          size={40}
          variant="outline"
          color="red"
          radius={"50%"}
          onClick={endCall}
        >
          <MdCallEnd size={40} color="red" />
        </ActionIcon>
      </Flex>
    </Box>
  );
}
