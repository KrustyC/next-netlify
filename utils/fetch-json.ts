import { REST_METHOD } from "../types/global";

export type Options<Body> = {
  method?: REST_METHOD;
  token?: string;
  body?: Body;
};

export async function fetchJson<Body>(
  url: string,
  { method = REST_METHOD.GET, token, body }: Options<Body>
) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options["body"] = JSON.stringify(body);
  }

  const res = await fetch(url, options);

  if (res.status !== 200) {
    throw new Error("Error fetching data");
  }

  return res.json();
}
