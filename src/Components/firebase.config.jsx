// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm2WBwtY1GcNW32FJAZHQ1CO1CcnSG5Iw",
  authDomain: "sms-sending-react-app.firebaseapp.com",
  projectId: "sms-sending-react-app",
  storageBucket: "sms-sending-react-app.appspot.com",
  messagingSenderId: "843208233960",
  appId: "1:843208233960:web:7b873b0e054d0030ef4a5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
