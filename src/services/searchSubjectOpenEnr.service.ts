import qs from "qs";
import { axiosAPIWithAuth } from "utils/axiosAPI";
import { z } from "zod";

import { QSConfig } from "@/configs/common/QSConfig";
import { type BaseApiStructureSubjectsSearch } from "@/types/responses/IBaseApiStructure";
import { type ISearchSubjectOpenEnrResponse } from "@/types/responses/ISearchSubjectOpenEnrResponse";

export const SearchSubjectOpenEnrSchema = z.object({
  query: z.string(),
});

export type SearchSubjectOpenEnrInput = z.infer<
  typeof SearchSubjectOpenEnrSchema
>;

const searchSubjectOpenEnrService = async (
  props: SearchSubjectOpenEnrInput,
) => {
  try {
    const query = qs.stringify({ ...props }, QSConfig);

    const res = await axiosAPIWithAuth.get<
      BaseApiStructureSubjectsSearch<ISearchSubjectOpenEnrResponse[]>
    >(`/enroll/searchSubjectOpenEnr${query}`);
    
    
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default searchSubjectOpenEnrService;
