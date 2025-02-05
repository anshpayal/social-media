import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, limit, getFirestore } from 'firebase/firestore';

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

// Add these new types
type FirebaseUser = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

// Add this new function to fetch users
export const fetchUsers = async (searchTerm: string = ''): Promise<FirebaseUser[]> => {
  try {
    const db = getFirestore(app);
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('displayName', '>=', searchTerm),
      where('displayName', '<=', searchTerm + '\uf8ff'),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    const users: FirebaseUser[] = [];
    
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as FirebaseUser);
    });
    
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
