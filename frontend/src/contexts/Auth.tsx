import React, { useState, useContext, createContext } from "react";
import authService, { LoginParams, LoginOPTParams,  LoginResponse } from "services/auth.service";
import { parseJwt } from "../utils/parseJwt";
import { JWTUser } from "../types/user";

export type Auth = {
  user: JWTUser | null;
  login: (params: LoginParams) => Promise<LoginResponse>;
  loginConfirm: (params: LoginOPTParams) => Promise<LoginResponse>;
  logout: () => void;
  // isAllowedTo: (resource: string, action: string) => boolean;
};

const authContext = createContext<Auth | null>(null);

const saveCredentials = (access_token: string) => {
  // @TODO localStorage is not perfect solution for holding senstive data. Signed secure cookie might be better in real life
  localStorage.setItem(
    "token",
    JSON.stringify(access_token)
  );
  localStorage.setItem(
    "user",
    JSON.stringify(parseJwt(access_token))
  );
}

const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  if (user) {
    return JSON.parse(user);
  }

  return null;
};

export const useProvideAuth = (): Auth => {
  const [user, setUser] = useState<JWTUser | null>(getCurrentUser());

  const login = async (params: LoginParams) => {
    const response = await authService.login(params);

    if (response.access_token) {
      saveCredentials(response.access_token)
      setUser(parseJwt(response.access_token));
    }

    return response;
  };

  const loginConfirm = async (params: LoginOPTParams) => {
    const response = await authService.loginConfirm(params);

    if (response.access_token) {
      saveCredentials(response.access_token)
      setUser(parseJwt(response.access_token));
    }

    return response;
  };

  /*
  const isAllowedTo = (resource: string, action: string) => {
    if (!user?.scopes) return false;
    const requiredScope = `focal:${resource}:${action}`;

    return user?.scopes.includes(requiredScope);
  };
  */

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return {
    user,
    login,
    logout,
    loginConfirm,
    // isAllowedTo,
  };
};

interface IProvideAuth {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IProvideAuth> = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
