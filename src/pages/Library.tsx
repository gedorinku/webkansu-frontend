import { css } from '@linaria/core';
import React, { useContext, useState } from 'react';
import Reader from '../components/Reader';

function Library() {
  const [url, setUrl] = useState<string>('');
  const [text, setText] = useState<string>('');

  const handleChangeUrlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target?.value);
  }

  const handleClickFetchButton = async () => {
    const bodyText = await (await fetch(url)).text();
    const elements = new DOMParser().parseFromString(bodyText, "text/html").querySelectorAll("#novel_honbun > p");

    const text = Array.from(elements).map(element => element.textContent ?? '').join('\n');
    setText(text ?? '取得失敗');
  }

  const library = css`
    font-size: 20px;
  `;

  return (
    <div className={library}>
      <header>
        <h1>webkansu</h1>
        <input value={url} onChange={handleChangeUrlInput} type="text"></input>
        <button onClick={handleClickFetchButton}>GET</button>
      </header>
      <Reader text={text}></Reader>
    </div>
  );
}

export default Library;
