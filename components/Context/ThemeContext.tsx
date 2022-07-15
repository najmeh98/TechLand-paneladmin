import React, { useContext } from "react";
import { Theme } from "../types/theme";
import { lightTheme } from "../utils/theme";

type Contexttype = Theme;

const initialValue: Contexttype = lightTheme;

export const ThemeContext = React.createContext(initialValue);

export const useTheme = (): Theme => {
  return useContext(ThemeContext);
};
