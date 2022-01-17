import { useState } from "react";
import { fetchJson } from "../utils/fetch-json";
import { NetlifyUser } from "../types/auth";
import { REST_METHOD } from "../types/global";

interface UseNetlifyFunctionProps {
  user?: NetlifyUser | null;
}

interface UseNetlifyFunctionReturn<T> {
  pending: boolean;
  error?: Error | undefined;
  onDelete: (path: string) => Promise<any>;
}

export function useNetlifyDeleteFunction<T>({
  user,
}: UseNetlifyFunctionProps): UseNetlifyFunctionReturn<T> {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<Error>();

  const onDelete = async (path: string): Promise<any> => {
    setPending(true);
    setError(undefined);

    try {
      const url = `${process.env.baseUrl}/.netlify/functions${path}`;
      const options = {
        method: REST_METHOD.DELETE,
        token: user?.token.access_token,
      };

      const response = await fetchJson(url, options);
      setPending(false);
      return response;
    } catch (error) {
      setError(error as Error);
      setPending(false);
      return undefined;
    }
  };

  return { onDelete, pending, error };
}
