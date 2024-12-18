import CryptoJS from 'crypto-js';
import { z } from 'zod';

import db from '@/configs/firebase/firestoreAdmin';
import { type CreditManagementSchemaType } from '@/schemas/creditManagement/creditManagement.schema';

export const GetCreditManagementSchema = z.object({
  studentCode: z.string(),
});

export type GetCreditManagementInput = z.infer<typeof GetCreditManagementSchema>;

const getCreditManagementService = async (props: GetCreditManagementInput) => {
  try {
    const studentCodeHash = CryptoJS.SHA256(props.studentCode).toString(CryptoJS.enc.Hex);
    const syncRef = db.collection("credit-management").doc(studentCodeHash);
    const syncDoc = await syncRef.get();
    if (!syncDoc.exists) {
      return null;
    }
    const data = syncDoc.data();
    if (!data) {
        return null;
    }

    return (data.course ?? null) as CreditManagementSchemaType | null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getCreditManagementService;
