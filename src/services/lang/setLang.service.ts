import CryptoJS from 'crypto-js';
import { z } from "zod";

import db from "@/configs/firebase/firestoreAdmin";

export const SetLangSchema = z.object({
  studentCode: z.string(),
  lang: z.string(),
});

export type SetLangInput = z.infer<typeof SetLangSchema>;

const setLangService = async (props: SetLangInput) => {
  try {
    const studentCodeHash = CryptoJS.SHA256(props.studentCode).toString(CryptoJS.enc.Hex);
    const langRef = db.collection("lang").doc(studentCodeHash);
    await langRef.set({
      lang: props.lang,
    });
  } catch (error) {
    throw error;
  }
};

export default setLangService;
