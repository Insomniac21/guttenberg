import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  throw new Error('Invalid/Missing environment variable: "FIREBASE_API_KEY"')
} else if (!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) {
  throw new Error('Invalid/Missing environment variable: "FIREBASE_AUTH_DOMAIN"')
} else if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  throw new Error('Invalid/Missing environment variable: "FIREBASE_PROJECT_ID"')
}

export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: "guttenberg-c1b1b.appspot.com",
    messagingSenderId: "574262271261",
    appId: "1:574262271261:web:401791160c5ae0c7aa95f4"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth();