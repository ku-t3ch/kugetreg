import CryptoJS from 'crypto-js';
import { z } from 'zod';

import db from '@/configs/firebase/firestoreAdmin';
import { type Course } from '@/types/responses/IGroupCourseResponse';

export const GetPlanningCourseSchema = z.object({
  studentCode: z.string(),
});

export type GetPlanningCourseInput = z.infer<typeof GetPlanningCourseSchema>;

const getPlanningCourseService = async (props: GetPlanningCourseInput) => {
  try {
    const studentCodeHash = CryptoJS.SHA256(props.studentCode).toString(CryptoJS.enc.Hex);
    const syncRef = db.collection("sync").doc(studentCodeHash);
    const syncDoc = await syncRef.get();
    if (!syncDoc.exists) {
      return [];
    }
    const data = syncDoc.data();
    if (!data) {
        return [];
    }

    return JSON.parse(data.course) as Course[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getPlanningCourseService;
