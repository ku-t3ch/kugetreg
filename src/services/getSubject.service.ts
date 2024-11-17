import { type BaseApiStructure } from "@/types/responses/IBaseApiStructure";
import { type ISubjectResponse } from "@/types/responses/ISubjectResponse";
import { axiosAPIWithAuth } from "utils/axiosAPI";
import qs from "qs";
import { z } from "zod";
import { QSConfig } from "@/configs/common/QSConfig";

export const GetSubjectSchema = z.object({
  query: z.string(),
  academicYear: z.number(),
  semester: z.number(),
  campusCode: z.string(),
  section: z.string(),
});

export type GetSubjectInput = z.infer<typeof GetSubjectSchema>;

const getSubjectService = async (props: GetSubjectInput) => {
  try {
    const query = qs.stringify(props, QSConfig);
    const res = await axiosAPIWithAuth.get<
      BaseApiStructure<ISubjectResponse[]>
    >(`/enroll/openSubjectForEnroll${query}`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getSubjectService;
