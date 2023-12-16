import { useEffect, useRef, useState } from "react";
import CallListner from "../services/call/callListner";
import { useNavigate } from "react-router-dom";

export default function useCallListner() {
  const [incomingCaller, setIncomingCaller] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const callListner = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function onCallCallback(caller) {
      setIncomingCaller(caller);
      setShowNotification(true);
    }
    function onCallAbortCallback() {
      setShowNotification(false);
    }

    callListner.current = new CallListner(onCallCallback, onCallAbortCallback);
  }, []);

  function acceptCall() {
    callListner.current?.acceptCall();

    navigate("/video-call", {
      state: { role: "callee", receiverId: incomingCaller.id },
    });

    setShowNotification(false);
  }

  function rejectCall() {
    callListner.current?.rejectCall(incomingCaller.id);
    setIncomingCaller(null);
    setShowNotification(false);
  }
  return {
    incomingCaller,
    showNotification,
    acceptCall,
    rejectCall,
  };
}
