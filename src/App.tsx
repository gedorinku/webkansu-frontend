import { css } from '@linaria/core';
import React, { useState } from 'react';
import Reader from './Reader';

export const globals = css`
  :global() {
    body {
      margin: 0;
      font-family: 'Shippori Mincho', serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

  const handleChangeUrlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event) setUrl(event.target?.value);
  }

  const app = css`
    font-family: 'Shippori Mincho', serif;
    font-size: 20px;
  `;

  return (
    <div className={app}>
      <header className="App-header">
        <h1>webkansu</h1>
        <input value={url} onChange={handleChangeUrlInput} type="text"></input>
        <button onClick={handleClickFetchButton}>GET</button>
      </header>
      <Reader text={text}></Reader>
    </div>
  );
}

export default App;
