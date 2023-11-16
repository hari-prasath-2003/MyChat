import { useState, useEffect } from "react";
import api from "../services/api";
export const useApiGet = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get(url);
        setData(data);
        setError("");
      } catch (error) {
        setError(error.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);
  return { data, loading, error };
};
