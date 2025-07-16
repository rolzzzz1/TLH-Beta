import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase configuration
// To get your configuration:
// 1. Go to Firebase Console (https://console.firebase.google.com)
// 2. Select your project
// 3. Click Project Settings (gear icon)
// 4. Under "Your apps", find or create a web app
// 5. Copy the firebaseConfig object
export const firebaseConfig = {
  apiKey: "AIzaSyCwsXRqqFFQmuWBjegAfVtv1pAUYD1zzSE",
  authDomain: "tlh---beta.firebaseapp.com",
  projectId: "tlh---beta",
  storageBucket: "tlh---beta.firebasestorage.app",
  messagingSenderId: "185116067007",
  appId: "1:185116067007:web:7a2003b553c4d30ddd720a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 