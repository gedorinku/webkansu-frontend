export const getStorage = (key: string): Promise<string> => new Promise(resolve => {
  chrome.storage.local.get(key, (value) => {
    resolve(value[key])
  })
});
