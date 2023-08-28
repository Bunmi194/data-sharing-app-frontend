import { initializeApp } from "firebase/app";

const details = {
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID: process.env.REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID: process.env.REACT_APP_APP_ID,
    REACT_APP_MEASUREMENT_ID: process.env.REACT_APP_MEASUREMENT_ID

}
export const firebaseConfig = {
  apiKey: details.REACT_APP_API_KEY,
  authDomain: details.REACT_APP_AUTH_DOMAIN,
  projectId:details.REACT_APP_PROJECT_ID,
  storageBucket: details.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: details.REACT_APP_MESSAGING_SENDER_ID,
  appId: details.REACT_APP_APP_ID,
  measurementId: details.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export default app;
