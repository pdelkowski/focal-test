import { useState, useEffect } from "react";
import fetchAPI from "utils/fetchAPI";

const useFetchAPI = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetchAPI<T>(url, options);
      setData(response);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchAPI;
