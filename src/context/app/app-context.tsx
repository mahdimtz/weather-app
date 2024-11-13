import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import appReducer from "./app-reducer";

type Language = "fa" | "en";
type Theme = "dark" | "light";

interface AppState {
  language: Language;
}

interface AppContextType extends AppState {
  changeLanguage: (language: Language) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState = {
  language: (localStorage.getItem("language") as Language) || "en",
  themeMode: (localStorage.getItem("theme")as Theme) || "dark",
};
console.log(localStorage);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { i18n } = useTranslation();

  const changeLanguage = (language: Language) => {
    dispatch({ type: "CHANGE_LANGUAGE", payload: language });
  };
  const changeTheme = (themeMode: Theme) => {
    dispatch({ type: "CHANGE_THEME", payload: themeMode });
  };
  useEffect(() => {
    i18n.changeLanguage(state.language);
    localStorage.setItem("language", state.language);
    document.body.style.direction = state.language === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = state.language;
  }, [state.language, i18n]);

  const contextValue: AppContextType = {
    ...state,
    changeLanguage,
    changeTheme,
  };
  useEffect(() => {
    localStorage.setItem("theme", state.themeMode);
  }, [state.themeMode]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const useAppContext = (): any => {
  const context = useContext(AppContext);
  if (context) {
    return useContext(AppContext);
  }
 


  
};
export { useAppContext, AppProvider };
