import { useContext, useEffect, useState } from "react";
import { fetchJson } from "../utils/fetch-json";
import { AuthContext } from "../contexts/AuthContext";

interface UseNetlifyFunctionProps {
  fetchUrlPath: string;
}

interface UseNetlifyFunctionReturn<T> {
  loading: boolean;
  error?: Error | undefined;
  data: T | undefined;
}

export function useNetlifyGetFunction<T>({
  fetchUrlPath,
}: UseNetlifyFunctionProps): UseNetlifyFunctionReturn<T> {
  const [data, setData] = useState<T | undefined>();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  console.log('process.env.BASE_URL', process.env.baseUrl);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const url = `${process.env.baseUrl}/.netlify/functions${fetchUrlPath}`;
        const options = {
          token: user?.token.access_token,
        };

        const response = await fetchJson(url, options);

        setData(response);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, fetchUrlPath]);

  return { data, loading, error };
}
