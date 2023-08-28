import { initializeApp } from "firebase/app";

const details = {
    REACT_APP_API_KEY: "AIzaSyD9u0zS7sLjnCEvMDJVdCRxVt3ECijGfnA",
    REACT_APP_AUTH_DOMAIN: "data-sharing-app-c44ef.firebaseapp.com",
    REACT_APP_PROJECT_ID: "data-sharing-app-c44ef",
    REACT_APP_STORAGE_BUCKET: "data-sharing-app-c44ef.appspot.com",
    REACT_APP_MESSAGING_SENDER_ID: "1086397368593",
    REACT_APP_APP_ID: "1:1086397368593:web:38992ff0971c9a5a4d24b0",
    REACT_APP_MEASUREMENT_ID: "G-RD7Z0DZW54"

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
