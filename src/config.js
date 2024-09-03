// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLRhpE4B2v420BUxOdqVXfPD_Yk0Mcaxs",
  authDomain: "hubspot-f4e01.firebaseapp.com",
  projectId: "hubspot-f4e01",
  storageBucket: "hubspot-f4e01.appspot.com",
  messagingSenderId: "259422547172",
  appId: "1:259422547172:web:39366808498ab0dae810f1",
  measurementId: "G-DG2WCQ10MV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app)

export {db}