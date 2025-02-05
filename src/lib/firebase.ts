import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA-y7kI1hC7WAfYAsZ5m2RYFFOhcfGuGkk",
  authDomain: "socialmediaapp-36973.firebaseapp.com",
  projectId: "socialmediaapp-36973",
  storageBucket: "socialmediaapp-36973.firebasestorage.app",
  messagingSenderId: "1008214391979",
  appId: "1:1008214391979:web:628d3ad88e0d41dc34cbee",
  measurementId: "G-CGXGJFQTH2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error during sign-in:', error);
    return null;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const registerWithEmail = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Log in with email and password
export const loginWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const fetchUsers = async () => {
  const db = getFirestore();
  const usersCollection = collection(db, "users");
  const userDocs = await getDocs(usersCollection);
  
  const users = userDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  
  return users;
};