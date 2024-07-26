import { useEffect, useState } from "react";
import Notification from "../services/notification";

export default function useNotification(event) {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    function onEventCallback(data) {
      setNotification({ ...data });
    }

    const notification = new Notification(event, onEventCallback);

    return () => {
      notification.destroy();
    };
  }, []);

  return { notification };
}
