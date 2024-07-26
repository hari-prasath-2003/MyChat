import { useEffect, useRef } from "react";
import CallManager from "../services/call/callManager";
import { useNavigate } from "react-router-dom";

export default function useCall(user, receiverId, role, userMediaStream) {
  const remoteUserMedia = useRef(null);
  const activeCall = useRef(null);

  const navigate = useNavigate();

  function callEndCallback() {
    setTimeout(() => navigate("/home"), 3000);
  }

  useEffect(() => {
    if (!userMediaStream) return;

    async function initCall() {
      activeCall.current = new CallManager(
        user,
        receiverId,
        userMediaStream,
        remoteUserMedia.current,
        callEndCallback
      );

      if (role === "caller") {
        activeCall.current.requestVideoCall();
      }
      if (role === "callee") {
        activeCall.current.acceptVideoCall();
      }
    }

    initCall();

    return () => {
      activeCall.current?.destroy();
    };
  }, [userMediaStream]);

  function endCall() {
    activeCall.current.endCall();
  }

  return {
    remoteUserMedia,
    endCall,
  };
}
