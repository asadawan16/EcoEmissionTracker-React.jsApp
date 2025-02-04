import { useState, useEffect } from "react";
import apiClient from "../../api";

const useDataFetch = (endpoint, isPaginated = false) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState(
    isPaginated
      ? {
          items: [],
          totalItems: 0,
          totalPages: 1,
        }
      : null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = isPaginated
        ? await apiClient.get(
            `${endpoint}?pageNumber=${pageNumber}&pageSize=10`
          )
        : await apiClient.get(endpoint);

      setData(isPaginated ? response.data : response.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isPaginated || data === null) {
      fetchData();
    }
  }, [pageNumber, endpoint]);

  return { data, loading, error, fetchData, pageNumber, setPageNumber };
};

export default useDataFetch;
