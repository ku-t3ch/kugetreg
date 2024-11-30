import CryptoJS from 'crypto-js';
import { z } from 'zod';

import db from '@/configs/firebase/firestoreAdmin';

export const SavePlanningCourseSchema = z.object({
  course: z.string(),
  studentCode: z.string(),
});

export type SavePlanningCourseInput = z.infer<typeof SavePlanningCourseSchema>;

const savePlanningCourseService = async (props: SavePlanningCourseInput) => {
  try {
    const studentCodeHash = CryptoJS.SHA256(props.studentCode).toString(CryptoJS.enc.Hex);
    const syncRef = db.collection("sync").doc(studentCodeHash);
    await syncRef.set({
        lastSync: new Date(),
        course: props.course,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default savePlanningCourseService;
