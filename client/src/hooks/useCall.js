import { useEffect, useRef } from "react";
import CallManager from "../services/call/callManager";
import { useNavigate } from "react-router-dom";

export default function useCall(user, receiverId, role) {
  const userMediaStream = useRef(null);
  const userMedia = useRef(null);
  const remoteUserMedia = useRef(null);
  const activeCall = useRef(null);

  const navigate = useNavigate();

  function callEndCallback() {
    setTimeout(() => navigate("/home"), 1000);
  }

  useEffect(() => {
    async function initCall() {
      await getUserMedia();

      activeCall.current = new CallManager(
        user,
        receiverId,
        userMediaStream.current,
        remoteUserMedia.current,
        callEndCallback
      );

      if (role === "caller") {
        console.log("came here as caller");
        activeCall.current.requestVideoCall();
      }
      if (role === "callee") {
        activeCall.current.acceptVideoCall();
      }
    }

    initCall();

    return () => {
      activeCall.current.destroy();
      const tracks = userMediaStream.current.getTracks();
      tracks.forEach((track) => track.stop());
    };
  }, [role, receiverId, user]);

  async function getUserMedia() {
    userMediaStream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (userMedia.current) {
      userMedia.current.srcObject = userMediaStream.current;
    }
  }

  function endCall() {
    activeCall.current.endCall();
  }

  return {
    userMedia,
    remoteUserMedia,
    endCall,
  };
}
