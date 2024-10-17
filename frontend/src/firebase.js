import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDn6-7vKlMq0UP2J68PkTntWOr_OSvdn3s",
  authDomain: "fan-flights.firebaseapp.com",
  projectId: "fan-flights",
  storageBucket: "fan-flights.appspot.com",
  messagingSenderId: "406626974913",
  appId: "1:406626974913:web:1c7db1918a204be540a840",
  measurementId: "G-1JERYDT9ML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
