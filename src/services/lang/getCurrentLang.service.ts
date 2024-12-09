import CryptoJS from 'crypto-js';
import { z } from "zod";

import db from "@/configs/firebase/firestoreAdmin";

export const getCurrentLangSchema = z.object({
  studentCode: z.string()
});

export type GetCurrentLangInput = z.infer<typeof getCurrentLangSchema>;

const getCurrentLangService = async (props: GetCurrentLangInput) => {
  try {
    const studentCodeHash = CryptoJS.SHA256(props.studentCode).toString(CryptoJS.enc.Hex);
    const langRef = db.collection("lang").doc(studentCodeHash);
    const data = await langRef.get();
    if (!data.exists) {
      return { lang: "th" };
    }
    return data.data() as { lang: string };
  } catch (error) {
    throw error;
  }
};

export default getCurrentLangService;
