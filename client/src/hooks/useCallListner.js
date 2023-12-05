import { useEffect, useRef, useState } from "react";
import CallListner from "../services/call/callListner";

export default function useCallListner() {
  const [incomingCaller, setIncomingCaller] = useState(null);
  const callListner = useRef();
  useEffect(() => {
    function onCallCallback(caller) {
      setIncomingCaller(caller);
    }
    callListner.current = new CallListner(onCallCallback);
  }, []);

  function acceptCall(callBack) {
    callListner.current?.acceptCall();
    callBack();
  }
  function rejectCall() {
    setIncomingCaller(null);
    callListner.current?.rejectCall();
  }
  return {
    incomingCaller,
    acceptCall: acceptCall,
    rejectCall: rejectCall,
  };
}
