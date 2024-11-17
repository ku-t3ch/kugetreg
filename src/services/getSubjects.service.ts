import { QSConfig } from "@/configs/common/QSConfig";
import { type BaseApiStructure } from "@/types/responses/IBaseApiStructure";
import { type ISubjectResponse } from "@/types/responses/ISubjectResponse";
import { axiosAPIWithAuth } from "utils/axiosAPI";
import qs from "qs";
import { z } from "zod";

export const GetSubjectsSchema = z.object({
  query: z.string(),
  academicYear: z.number(),
  semester: z.number(),
  campusCode: z.string(),
});

export type GetSubjectsInput = z.infer<typeof GetSubjectsSchema>;

const getSubjectsService = async (props: GetSubjectsInput) => {
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

export default getSubjectsService;
