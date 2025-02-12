import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = { 
  apiKey: "AIzaSyC-pzomCDHQjXeKNkYfcSFrDEGNb8ZMIEc",
  authDomain: "impact-89f6d.firebaseapp.com",
  projectId: "impact-89f6d",
  storageBucket: "impact-89f6d.firebasestorage.app",
  messagingSenderId: "894599026047",
  appId: "1:894599026047:web:44969cb8fb6205c17eb64a",
  measurementId: "G-49NYN0F16D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
