import { useState } from "react";
import api from "../services/api";

const useApiPost = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function postData(body) {
    setLoading(true);

    try {
      const data = await api.post(url, body);
      setData(data);
      setError("");
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, postData };
};

export default useApiPost;
