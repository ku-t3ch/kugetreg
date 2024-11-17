import qs from "qs";
import { axiosAPIWithAuth } from "utils/axiosAPI";
import { z } from "zod";

import { QSConfig } from "@/configs/common/QSConfig";
import { type BaseApiStructure } from "@/types/responses/IBaseApiStructure";
import { type IGroupCourseResponse } from "@/types/responses/IGroupCourseResponse";

export const getGroupCourseSchema = z.object({
  academicYear: z.number(),
  semester: z.number(),
  stdId: z.string(),
});

export type GetGroupCourseInput = z.infer<typeof getGroupCourseSchema>;

const getGroupCourseService = async (props: GetGroupCourseInput) => {
  try {
    const query = qs.stringify(props, QSConfig);
    const res = await axiosAPIWithAuth.get<
      BaseApiStructure<IGroupCourseResponse[]>
    >(`/std-profile/getGroupCourse${query}`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getGroupCourseService;
