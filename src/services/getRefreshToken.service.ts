import { type IRenewTokenResponse } from "@/types/responses/IRenewTokenResponse";
import { axiosAPI } from "utils/axiosAPI";
import { z } from "zod";

export const GetRefreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export type GetRefreshInput = z.infer<typeof GetRefreshTokenSchema>;

const getRefreshTokenService = async (props: GetRefreshInput) => {
  try {
    const res = await axiosAPI.post<IRenewTokenResponse>(
      `/auth/renew`,
      {
        renewtoken: props.refreshToken,
      },
      {
        headers: {
          "x-access-token": props.refreshToken,
        },
      },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getRefreshTokenService;
