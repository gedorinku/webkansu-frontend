import React, { useContext } from 'react';
import { useState } from 'react';
import { css } from '@linaria/core'
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { registration } = useContext(AuthContext);

  const handleChangeEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target?.value);
  }

  const handleChangePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target?.value);
  }

  const handleChangePasswordConfirmInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(event.target?.value);
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    registration(email, password, passwordConfirm);
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
      <h1>新規登録</h1>
      <nav>
        既にアカウントをお持ちですか？
        <Link to="/login">ログイン</Link>
      </nav>
      <form className={registrationForm} onSubmit={handleSubmit}>
        <label htmlFor="email">メールアドレス</label>
        <input name="email" type="email" value={email} onChange={handleChangeEmailInput}></input>
        <label htmlFor="email">パスワード</label>
        <input name="email" type="password" value={password} onChange={handleChangePasswordInput}></input>
        <label htmlFor="email">パスワード(確認)</label>
        <input name="email" type="password" value={passwordConfirm} onChange={handleChangePasswordConfirmInput}></input>
        <input type="submit" value="登録"></input>
      </form>
    </>
  );
}

export default Registration;
