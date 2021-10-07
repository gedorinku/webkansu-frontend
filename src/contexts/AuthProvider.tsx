import React, { useCallback, useMemo, useState } from 'react';
import AuthContext, { AuthTokens } from './AuthContext';
import { useCookies } from 'react-cookie';

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token-type', 'uid', 'client', 'access-token']);

  const registration = useCallback(
    async (email: string, password: string, passwordConfirm: string) => {
      const response = await fetch(`http://localhost:3000/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'email': email,
          'password': password,
          'password_confirmation': passwordConfirm
        }),
      });

      if(response.status === 200) {
        console.log('Response', response);
        setCookie('token-type', response.headers.get('token-type'));
        setCookie('uid', response.headers.get('uid'));
        setCookie('client', response.headers.get('client'));
        setCookie('access-token', response.headers.get('access-token'));
      }
    },
    [setCookie]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await fetch(`http://localhost:3000/api/auth/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'email': email,
          'password': password
        }),
      });

      if(response.status === 200) {
        console.log('Response', response);
        setCookie('token-type', response.headers.get('token-type'));
        setCookie('uid', response.headers.get('uid'));
        setCookie('client', response.headers.get('client'));
        setCookie('access-token', response.headers.get('access-token'));
      }
    },
    [setCookie]
  );

  const logout = useCallback(() => {
    removeCookie('token-type');
    removeCookie('uid');
    removeCookie('client');
    removeCookie('access-token');
  }, [removeCookie]);

  const user = useCallback(async () => {
    // const authToken =
    const response = await fetch(`http://localhost:3000/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token-type': cookies['token-type'],
        'uid': cookies['uid'],
        'client': cookies['client'],
        'access-token': cookies['access-token']
      }
    });
    console.log(response);
  }, [cookies]);

  const info = useMemo(() => {
    return {
      tokenType: cookies['token-type'],
      uid: cookies['uid'],
      client: cookies['client'],
      accessToken: cookies['access-token']
    }
  }, [cookies]);

  return (
    <AuthContext.Provider value={{ registration, login, logout, user, info }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
