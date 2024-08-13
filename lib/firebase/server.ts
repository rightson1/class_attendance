import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
interface FirebaseAdminAppParams {
  projectId: string;
  privateKey: string;
  clientEmail: string;
}
function formatPrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n");
}

export const initializeFirebaseAdminApp = (params: FirebaseAdminAppParams) => {
  const privateKey = formatPrivateKey(params.privateKey);
  if (admin.apps.length > 0) {
    return admin.app();
  }
  const cert = admin.credential.cert({
    projectId: params.projectId,
    privateKey,
    clientEmail: params.clientEmail,
  });
  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
  });
};

export async function initAdmin() {
  const firebaseAdminApp = initializeFirebaseAdminApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
  });
  return firebaseAdminApp;
}
export async function auth_admin() {
  await initAdmin();
  return admin.auth();
}
