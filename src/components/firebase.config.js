import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

let auth;

try {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  auth.useDeviceLanguage();

} catch (error) {
  console.error("Error loading Firebase configuration:", error);
  // Handle the error gracefully (e.g., show a friendly error message)
}

export { auth };
