import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwsXRqqFFQmuWBjegAfVtv1pAUYD1zzSE",
  authDomain: "tlh---beta.firebaseapp.com",
  projectId: "tlh---beta",
  storageBucket: "tlh---beta.firebasestorage.app",
  messagingSenderId: "185116067007",
  appId: "1:185116067007:web:7a2003b553c4d30ddd720a"
};

console.log('Initializing Firebase with config:', {
  ...firebaseConfig,
  apiKey: '***' // Hide API key in logs
});

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Verify database connection
(async () => {
  try {
    const testQuery = await getDocs(collection(db, 'posts'));
    console.log('Firebase connection test successful. Number of posts:', testQuery.size);
  } catch (error) {
    console.error('Firebase connection test failed:', error);
  }
})(); 