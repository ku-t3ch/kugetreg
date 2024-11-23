import { env } from "@/env";
import { auth } from "@/server/auth";
import axios from "axios";

export const getBaseUrl = () => {
  return "https://myapi.ku.th";
};

export const axiosAPI = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "app-key": env.MYKU_APP_KEY,
  },
});

export const axiosAPIWithAuth = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "app-key": env.MYKU_APP_KEY,
  },
});

axiosAPIWithAuth.interceptors.request.use(async (request) => {
  const session = await auth();
  if (session) {
    request.headers["x-access-token"] = session?.user.access_token;
  }
  return request;
});
