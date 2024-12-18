import CryptoJS from "crypto-js";
import { z } from "zod";

import db from "@/configs/firebase/firestoreAdmin";
import { creditManagementSchema } from "@/schemas/creditManagement/creditManagement.schema";

export const SaveCreditManagementSchema = z.object({
  payload: creditManagementSchema,
  studentCode: z.string(),
});

export type SaveCreditManagementInput = z.infer<
  typeof SaveCreditManagementSchema
>;

const saveCreditManagementService = async (
  props: SaveCreditManagementInput,
) => {
  try {
    const studentCodeHash = CryptoJS.SHA256(props.studentCode).toString(
      CryptoJS.enc.Hex,
    );
    const syncRef = db.collection("credit-management").doc(studentCodeHash);
    await syncRef.set({
      lastSync: new Date(),
      course: props.payload,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default saveCreditManagementService;
