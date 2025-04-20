import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBDqxlfZtMQNlllIga2Ww2Hq0doB-MTha8",
  authDomain: "view-com-b2517.firebaseapp.com",
  projectId: "view-com-b2517",
  storageBucket: "view-com-b2517.firebasestorage.app",
  messagingSenderId: "800692122381",
  appId: "1:800692122381:web:944b7ae9035483ed4a3644",
  measurementId: "G-L8Y6NLRWXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

// Helper function to convert Firestore timestamp to JS Date
const convertTimestampToDate = (timestamp) => {
  if (!timestamp) return null
  return timestamp.toDate ? timestamp.toDate() : timestamp
}

// Helper function to generate a unique ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 8)
}

export {
  app,
  db,
  auth,
  storage,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  setDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  convertTimestampToDate,
  generateId,
}
