import { css } from '@linaria/core';
import React, { useState } from 'react';
import Reader from './Reader';

function App() {
  const [url, setUrl] = useState<string>('');
  const [text, setText] = useState<string>('');

  const handleClickFetchButton = async () => {
    const bodyText = await (await fetch(url)).text();
    const elements = new DOMParser().parseFromString(bodyText, "text/html").querySelectorAll("#novel_honbun > p");

    const text = Array.from(elements).map(element => element.textContent ?? '').join('\n');
    console.log(text);
    setText(text ?? '取得失敗');
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
