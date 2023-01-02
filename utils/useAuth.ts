import create from 'zustand';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import {app } from "../firebaseConfig"

import {useRouter} from 'next/navigation'
export interface User {
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
  
  const setUser = useUserStore((s) => s.setUser)
  const resetUser = useUserStore((s) => s.resetUser)

  const logout = async () => {
    try {
      await auth.signOut();
      resetUser();
    } catch (error) {
      console.error(error);
    }
  };

   // Automatically login the user if they are already authenticated
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
        router.push('/dashboard');
      } else {
        resetUser();
        router.push('/login');
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { logout };
}
