import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDPYj5GHrIpzA2xTs6s5OgUCd-UFwpX_mU',
  authDomain: 'course-app-b3e97.firebaseapp.com',
  projectId: 'course-app-b3e97',
  storageBucket: 'course-app-b3e97.appspot.com',
  messagingSenderId: '1093687711841',
  appId: '1:1093687711841:web:17255aaf9e1a8e1c533220',
  measurementId: 'G-NTQ29VF7BH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
