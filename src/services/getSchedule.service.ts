import { type BaseApiStructure } from "@/types/responses/IBaseApiStructure";
import { type IScheduleResponse } from "@/types/responses/IScheduleResponse";
import { axiosAPIWithAuth } from "utils/axiosAPI";
import qs from "qs";
import { z } from "zod";
import { QSConfig } from "@/configs/common/QSConfig";

export const getScheduleSchema = z.object({
  stdStatusCode: z.string(),
  campusCode: z.string(),
  facultyCode: z.string(),
  majorCode: z.string(),
  userType: z.string(),
});

export type GetScheduleInput = z.infer<typeof getScheduleSchema>;

const getScheduleService = async (props: GetScheduleInput) => {
  try {
    const query = qs.stringify(props, QSConfig);
    const res = await axiosAPIWithAuth.get<
      BaseApiStructure<IScheduleResponse[]>
    >(
      `/common/getschedule${query}`,
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getScheduleService;
