import { env } from "@/env";
import crypto from "crypto";
import { type ISignInServiceResponse } from "@/types/responses/ISignInServiceResponse";
import { axiosAPI } from "utils/axiosAPI";

const encodeString = (str: string) => {
  return crypto
    .publicEncrypt(
      {
        key: env.MYKU_PUBLIC_KEY.replace(/\\n/gm, "\n"),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(str, "utf8"),
    )
    .toString("base64");
};

interface ISignInServiceProps {
  username: string;
  password: string;
}

const SignInService = async (props: ISignInServiceProps) => {
  try {
    const res = await axiosAPI.post<ISignInServiceResponse>(
      "/myku/api/v2/user-login/login",
      {
        username: encodeString(props.username),
        password: encodeString(props.password),
      },
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,th;q=0.8",
          "app-key": env.MYKU_APP_KEY,
          "content-type": "application/json",
          origin: "https://my.ku.th",
          priority: "u=1, i",
          referer: "https://my.ku.th/myku/myku?intent=/",
          "sec-ch-ua":
            '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        },
      },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default SignInService;
