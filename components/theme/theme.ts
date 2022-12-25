import create from "zustand";
type Theme = {
    theme: string | null;
    setTheme: (theme: string) => void;
};

export default create<Theme>(set => ({
    theme: typeof window !== "undefined" ? localStorage.getItem("theme") : 'dark',
    setTheme: (theme) => {set({ theme }); localStorage.setItem("theme", theme)},
  }));
