"use client";
import { AgentCred } from "@/app/interfaces/login.interface";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (data: any) => void;
  logout: () => void;
  checkAuthAndRedirect: () => void;
  userCredentials: AgentCred;
  localStorageKey: boolean;
}

const initialState: AuthContextProps = {
  isLoggedIn: false,
  login: (data: any) => {},
  logout: () => {},
  checkAuthAndRedirect: () => {},
  userCredentials: {
    agent_id: "",
    agent_avatar_url: "",
    agent_access: "",
    agent_refresh: "",
    agent_full_name: "",
    agent_role: "",
    agent_phone_number: "",
  },
  localStorageKey: false,
};

export const AuthContext = createContext<AuthContextProps>(initialState);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const localStorageAvailable = typeof localStorage !== 'undefined';
    return localStorageAvailable && !!localStorage.getItem("it's fkn secret, boy");
  });

  const [localStorageKey, setLocalStorageKey] = useState<boolean>(() => {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem("it's fkn secret, boy");
  });

  const [userCredentials, setUserCredentials] = useState<AgentCred>(() => {
    const storedUserCredentials = typeof localStorage !== 'undefined'
      ? localStorage.getItem("it's fkn secret, boy")
      : null;

    return storedUserCredentials ? JSON.parse(storedUserCredentials) : {};
  });

  const router = useRouter();

  const login = (data: any) => {
    localStorage.setItem("it's fkn secret, boy", JSON.stringify(data));
    setIsLoggedIn(true);
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("it's fkn secret, boy");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const checkAuthAndRedirect = () => {
    const localStorageAvailable = typeof localStorage !== 'undefined';
  
    const userLoggedIn = localStorageAvailable && !!localStorage.getItem("it's fkn secret, boy");
    setIsLoggedIn(userLoggedIn);
  
    if (!userLoggedIn) {
      router.push("/login");
    }
  };
  
  // Проверка аутентификации (допустим, как-то очистился local storage),
  // спустя 5 минут этот useEffect пойдет смотреть, все ли норм
  useEffect(() => {
    const localStorageAvailable = typeof localStorage !== 'undefined';
  
    if (localStorageAvailable) {
      checkAuthAndRedirect(); // Проверить сразу после монтирования компонента
  
      const interval = setInterval(() => {
        checkAuthAndRedirect();
      }, 300000);
  
      return () => clearInterval(interval);
    }
  
    // Если localStorage недоступен, можно предпринять соответствующие действия
    console.log('localStorage is not available.');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        checkAuthAndRedirect,
        userCredentials,
        localStorageKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};