import { env } from "@/env";
import admin from "firebase-admin";

let firebaseAdmin: admin.app.App;

if (!admin.apps.length) {
  firebaseAdmin = admin.initializeApp(
    process.env.FIREBASE_ADMIN && process.env.FIREBASE_ADMIN.length > 0
      ? {
          credential: admin.credential.cert(JSON.parse(env.FIREBASE_ADMIN as string)),
        }
      : {},
  );
} else {
  firebaseAdmin = admin.app();
}

export default firebaseAdmin;
