import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, limit, getFirestore } from 'firebase/firestore';
import { createClient } from '@supabase/supabase-js';

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

// Add Supabase client configuration
const supabaseUrl = 'https://cfhqyojxrrjucpnpihpf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmaHF5b2p4cnJqdWNwbnBpaHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NzY5NzksImV4cCI6MjA1NDI1Mjk3OX0.8Zx4T0ePFcwzsWpAEtjASs5GNibbIxxdGlmJAlQaq8s';
const supabase = createClient(supabaseUrl, supabaseKey);

// Update the type to include username
type FirebaseUser = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  username: string;
};

// Update the store user function to include username
const storeUserInSupabase = async (user: User, username: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .upsert({
        id: user.uid,
        email: user.email,
        display_name: user.displayName,
        photo_url: user.photoURL,
        username: username,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'id'
      });

    if (error) {
      console.error('Error storing user in Supabase:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in storeUserInSupabase:', error);
    return null;
  }
};

// Add function to check if username exists
export const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single();

    if (error) {
      return true; // Username is available if there's an error (no match found)
    }
    return !data; // Username is available if no data is returned
  } catch (error) {
    console.error('Error checking username:', error);
    return false;
  }
};

// Update the registration function to include username
export const registerWithEmail = async (email: string, password: string, username: string) => {
  try {
    // Check if username is available
    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) {
      throw new Error('Username is already taken');
    }

    const result = await createUserWithEmailAndPassword(auth, email, password);
    await storeUserInSupabase(result.user, username);
    return result;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Update Google sign in to not require username for login
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Check if user already exists in Supabase
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('id', result.user.uid)
      .single();

    // Only store in Supabase if this is a new user
    if (!existingUser) {
      // Generate a random username for Google sign-in
      const randomUsername = `user_${Math.random().toString(36).substr(2, 9)}`;
      await storeUserInSupabase(result.user, randomUsername);
    }

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

// Log in with email and password
export const loginWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Update the fetchUsers function to use username for mentions
export const fetchUsers = async (searchTerm: string = ''): Promise<FirebaseUser[]> => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .ilike('username', `%${searchTerm}%`)
      .limit(10);

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    return users.map(user => ({
      uid: user.id,
      displayName: user.display_name,
      email: user.email,
      photoURL: user.photo_url,
      username: user.username
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Add this new function to get user data including username
export const getCurrentUserData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user data:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getCurrentUserData:', error);
    return null;
  }
};
