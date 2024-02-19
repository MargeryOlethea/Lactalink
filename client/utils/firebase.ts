import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBKc7b3E8kHi2SAF8V3_H3fXnnnu9ojFxg",
  authDomain: "lactalink-58b43.firebaseapp.com",
  databaseURL:
    "https://lactalink-58b43-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lactalink-58b43",
  storageBucket: "lactalink-58b43.appspot.com",
  messagingSenderId: "1037821946035",
  appId: "1:1037821946035:web:db7b0f2afbb85d14be68c6",
  measurementId: "G-BVBSXD33Y9",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
