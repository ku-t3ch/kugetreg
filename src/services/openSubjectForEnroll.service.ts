import qs from "qs";
import { axiosAPIWithAuth } from "utils/axiosAPI";
import { z } from "zod";

import { QSConfig } from "@/configs/common/QSConfig";
import { type BaseApiStructure } from "@/types/responses/IBaseApiStructure";
import { type IOpenSubjectForEnrollResponse } from "@/types/responses/IOpenSubjectForEnrollResponse";

export const OpenSubjectForEnrollSchema = z.object({
  query: z.string(),
  academicYear: z.number(),
  semester: z.number(),
  campusCode: z.string(),
});

export type OpenSubjectForEnrollInput = z.infer<
  typeof OpenSubjectForEnrollSchema
>;

const openSubjectForEnrollService = async (
  props: OpenSubjectForEnrollInput,
) => {
  try {
    const query = qs.stringify({ ...props, section: "" }, QSConfig);

    const res = await axiosAPIWithAuth.get<
      BaseApiStructure<IOpenSubjectForEnrollResponse[]>
    >(`/enroll/openSubjectForEnroll${query}`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default openSubjectForEnrollService;
