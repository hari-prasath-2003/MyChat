import { useEffect, useRef } from "react";

export default function UserWebCam({ setVideoStream }) {
  const userVideo = useRef(null);
  const userVideoStream = useRef(null);
  const tracks = useRef([]);
  const gotCamera = useRef(false);

  useEffect(() => {
    async function getUserMedia() {
      if (gotCamera.current) return;

      gotCamera.current = true;

      userVideoStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (userVideo.current) {
        userVideo.current.srcObject = userVideoStream.current;
      }

      setVideoStream(userVideoStream.current);
      tracks.current = userVideoStream.current.getTracks();
    }

    getUserMedia();

    return () => {
      tracks.current.forEach((track) => track.stop());
    };
  }, []);

  return <video ref={userVideo} autoPlay muted></video>;
}
