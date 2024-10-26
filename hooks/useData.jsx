import { useState, useEffect } from "react";

const useData = (getData) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const videos = await getData();
      setData(videos);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData()

  return { data, loading, refetch };
};

export default useData;
