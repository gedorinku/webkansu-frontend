import { createContext } from 'react';

export type AuthTokens = {
  tokenType: string;
  uid: string;
  client: string;
  accessToken: string;
}

interface IAuthContext {
  info: AuthTokens | null;
  registration: (email: string, password: string, passwordConfirm: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  user: () => void;
}

const context = createContext<IAuthContext>({
  info: null,
  registration(): void {
    throw Error("Not Implemented");
  },
  login(): void {
    throw Error("Not Implemented");
  },
  logout(): void {
    throw Error("Not Implemented");
  },
  user(): void {
    throw Error("Not Implemented");
  }
});

export default context;
