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
  onCreate: (path: string, body: T) => Promise<any>;
}

export function useNetlifyPostFunction<T>({
  user,
}: UseNetlifyFunctionProps): UseNetlifyFunctionReturn<T> {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<Error>();

  const onCreate = async (path: string, body: T): Promise<any> => {
    setPending(true);
    setError(undefined);

    try {
      const url = `${process.env.baseUrl}/.netlify/functions${path}`;
      const options = {
        method: REST_METHOD.POST,
        token: user?.token.access_token,
        body,
      };

      const response = await fetchJson<T>(url, options);
      setPending(false);
      return response;
    } catch (error) {
      setError(error as Error);
      setPending(false);
    }

    return undefined;
  };

  return { onCreate, pending, error };
}
