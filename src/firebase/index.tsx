import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyATs81VnhYRmP3Np0HSwpvCbAqTnNH179M',
  authDomain: 'gotu-3c5cb.firebaseapp.com',
  projectId: 'gotu-3c5cb',
  storageBucket: 'gotu-3c5cb.appspot.com',
  messagingSenderId: '395829564416',
  appId: '1:395829564416:web:2b4f0db4009eb97e82b4e5',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
