import create from 'zustand';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import {app } from "../firebaseConfig"

import {useRouter} from 'next/navigation'
export interface User {
  // Add the properties for your user object here
  uid: string;
  email: string |null;
}
export const useUserStore = create<{
  user: User | null;
  setUser: (user: User | null) => void;
  resetUser: () => void;
}>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  resetUser: () => set({ user: null }),
}));

export const useAuth = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const { setUser, resetUser } = useUserStore();

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      setUser({
        uid: user.uid,
        email: user.email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      resetUser();
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      setUser({
        uid: user.uid,
        email: user.email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Automatically login the user if they are already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
        // router.push('/dashboard');
      } else {
        resetUser();
        router.push('/login');
      }
    });
    return () => {
      unsubscribe();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { login, logout, register };
}
