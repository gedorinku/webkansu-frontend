import { accessTokenKey, clientKey, tokenTypeKey, uidKey } from "../common/constant";
import { WebkansuDB } from "./db";
import { createBookmark, createNovel, findNovelBySlug, signIn } from "./api";

const db = new WebkansuDB();

chrome.runtime.onInstalled.addListener(async () => {
  const data = {
    email: 'mucho613@gmail.com',
    password: '123456'
  };

  const response = await signIn(data);

  if (response.status == 200) {
    console.log(response);
    // Add
    // [accessTokenKey, clientKey, tokenTypeKey, uidKey].forEach(async (key) => {
    //   await db.headers.add({
    //     key,
    //     value: response.headers.get(key) ?? ''
    //   })
    // })

    // Update
    [accessTokenKey, clientKey, tokenTypeKey, uidKey].forEach(async (key) => {
      await db.headers.update(key, {
        value: response.headers.get(key) ?? ''
      })
    })
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {
    case 'findNovelBySlug':
      findNovelBySlug(message.params).then(async (response) => {
        sendResponse(await convertResponse(response));
      });
      return true;
    case 'createNovel':
      createNovel(message.params).then(async response => {
        sendResponse(await convertResponse(response));
      });
      return true;
    case 'createBookmark':
    default:
      sendResponse(createBookmark(message.params).then(async response => {
        sendResponse(await convertResponse(response));
      }));
      return true;
  }
});

export const convertResponse = async (response: Response) => {
  return {
    status: response.status,
    json: await response.json()
  }
};

export const getAuthHeaders = async () => {
  const accessToken = await db.headers
    .where('key')
    .equals(accessTokenKey)
    .first();
  const client = await db.headers
    .where('key')
    .equals(clientKey)
    .first();
  const tokenType = await db.headers
    .where('key')
    .equals(tokenTypeKey)
    .first();
  const uid = await db.headers
    .where('key')
    .equals(uidKey)
    .first();

  return {
    [accessTokenKey]: accessToken?.value ?? '',
    [clientKey]: client?.value ?? '',
    [tokenTypeKey]: tokenType?.value ?? '',
    [uidKey]: uid?.value ?? ''
  }
}
