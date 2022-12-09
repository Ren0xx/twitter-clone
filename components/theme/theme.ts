import create from "zustand";
type Theme = {
    theme: string;
    setTheme: (theme: string) => void;
};

export default create<Theme>(set => ({
    theme: 'dark',
    setTheme: (theme) => set({ theme }),
  }));
