import { useState, useEffect } from "react";
import axios from "axios";

const useGetData = (url, params) => {
  const apiKey = import.meta.env.VITE_SPOOACULAR_KEY;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          params: { ...params, apiKey },
        });
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, params, apiKey]);

  return { data, loading, error };
};

export default useGetData;
