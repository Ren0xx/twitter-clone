import { darkTheme, lightTheme } from "./themes";
import { Theme } from "@mui/material/styles";

import create from "zustand";
import shallow from "zustand/shallow";
import produce from "immer";

type theme = {
    theme: string;
    setTheme: (theme: string) => void;
};

export default create<theme>(set => ({
    theme: 'light',
    setTheme: (theme: string) => set({ theme }),
  }));
