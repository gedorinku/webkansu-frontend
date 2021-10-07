import React, { useContext } from 'react';
import { useState } from 'react';
import { css } from '@linaria/core'
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleChangeEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target?.value);
  }

  const handleChangePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target?.value);
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    login(email, password);
    event.preventDefault();
  }

  const registrationForm = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `;

  return (
    <>
      <h1>ログイン</h1>
      <nav>
        アカウントをお持ちでないですか？
        <Link to="/registration">新規登録</Link>
      </nav>
      <form className={registrationForm} onSubmit={handleSubmit}>
        <label htmlFor="email">メールアドレス</label>
        <input name="email" type="email" value={email} onChange={handleChangeEmailInput}></input>
        <label htmlFor="password">パスワード</label>
        <input name="password" type="password" value={password} onChange={handleChangePasswordInput}></input>
        <input type="submit" value="ログイン"></input>
      </form>
    </>
  );
}

export default Registration;
