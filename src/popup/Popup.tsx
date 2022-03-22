import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { DefaultService } from "../api";
import { accessTokenKey, clientKey, storageKey, tokenTypeKey, uidKey } from "../common/constant";

const data = {
  email: 'mucho613@gmail.com',
  password: '123456'
};

const Popup: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    chrome.storage.local.get(storageKey, value => {
      setAccessToken(value[storageKey]);
    });
  }, []);

  const handleSignIn = () => {
    fetch('http://localhost:3000/api/auth/sign_in', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        const tokenType = response.headers.get(tokenTypeKey)
        const client = response.headers.get(clientKey)
        const uid = response.headers.get(uidKey)
        const accessToken = response.headers.get(accessTokenKey)

        chrome.storage.local.set({
          [tokenTypeKey]: tokenType,
          [clientKey]: client,
          [uidKey]: uid,
          [accessTokenKey]: accessToken
        });
        setAccessToken(response.headers.get(accessTokenKey));

        chrome.runtime.sendMessage(accessToken);
      });
  }

  const handleSignOut = () => {
    chrome.storage.local.remove(storageKey);
    setAccessToken(null);
  }

  return (
    <div>
      {
        accessToken ?
        <>
          <p>Access Token: {accessToken}</p>
          <p>ログイン済みです</p>
          <button onClick={handleSignOut}>サインアウト</button>
        </> :
        <>
          <input type="email" />
          <input type="password" />
          <button onClick={handleSignIn}>サインイン</button>
        </>
      }

    </div>
  );
}

render(<Popup/>, document.getElementById("root"));
