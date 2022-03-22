import { calculateParagraphPosition } from './bookmark';
import { initializeDOM } from './dom';
import { getChapterInfo, getNovelInfo } from './novel';
import { getStorage } from './storage';

(async () => {
  // DOM 準備
  const contentDOM = initializeDOM();

  const lastKey = 'last-update-target';

  const pageType = getPageType();

  if (pageType === 'SinglePageBodyPage') {
    contentDOM.innerText = '単一チャプター作品の本文ページです。';
  }
  else if (pageType === 'MultiplePageBodyPage') {
    contentDOM.innerText = 'シリーズ作品の本文ページです。';
  }
  else if (pageType === 'SeriesTopPage') {
    contentDOM.innerText = 'シリーズ作品のトップページです。';
  }
  else {
    contentDOM.innerText = 'その他のページです。';
  }

  if (pageType === 'MultiplePageBodyPage') {
    const { novelSlug, novelTitle, novelWriterName } = getNovelInfo();
    const { chapterSlug, novelSubtitle } = getChapterInfo();

    const last = await getStorage(lastKey);

    // 作品を開いたことがあるのかチェック
    const { status, json } = await findNovelBySlug(novelSlug);

    if (novelSlug !== last) {
      if (status === 200) {
        if (json.bookmark) {
          const url = `https://ncode.syosetu.com/${json.slug}/${json.bookmark.slug}#${json.bookmark.position}`;
          contentDOM.innerHTML = `前回読んだときのしおり(<a href="${url}">第${json.bookmark.slug}話 ${json.bookmark.title}, ${json.bookmark.position}</a>)があります。しおりを現在の位置に追従させますか？`;
          dialogUpdateBookmark(() => {
            chrome.storage.local.set({ 'last-update-target': novelSlug });
            const paragraphsWithPosition = calculateParagraphPosition();
            setUpdateBookmarkByScroll(contentDOM, paragraphsWithPosition, novelSubtitle, chapterSlug, json.id);
          });
        }
        else {
          contentDOM.innerText = `しおりはありません。`
          await createBookmark(json.id, novelSubtitle, 'L1', chapterSlug);
          chrome.storage.local.set({ 'last-update-target': novelSlug });
        }
      }

      else if (status === 404) {
        await createNovel(novelTitle, novelWriterName, novelSlug);
        await createBookmark(json.id, novelSubtitle, 'L1', chapterSlug);
        chrome.storage.local.set({ 'last-update-target': novelSlug });
      }
    }
    else {
      const paragraphsWithPosition = calculateParagraphPosition();
      setUpdateBookmarkByScroll(contentDOM, paragraphsWithPosition, novelSubtitle, chapterSlug, json.id);
    }
  } else if (pageType === 'SeriesTopPage') {
    const { novelSlug, novelTitle, novelWriterName } = getNovelInfo();

    // 作品を開いたことがあるのかチェック
    const { status, json } = await findNovelBySlug(novelSlug);

    if (status === 200) {
      if (json.bookmark) {
        const url = `https://ncode.syosetu.com/${json.slug}/${json.bookmark.slug}#${json.bookmark.position}`;
        contentDOM.innerHTML = `しおりがあります。<br>前回読んだ地点は <a href="${url}">第${json.bookmark.slug}話「${json.bookmark.title}」${json.bookmark.position}</a> です。`
      }
      else {
        contentDOM.innerText = `しおりはありません。`
      }
    }
    else if (status === 404) {
      await createNovel(novelTitle, novelWriterName, novelSlug);
    }

    else {
      contentDOM.innerText = '作品が存在するかどうかのチェックに失敗しました。';
    }
  }

  type PageType =
    'SeriesTopPage' |
    'SinglePageBodyPage' |
    'MultiplePageBodyPage' |
    'OtherPage';

  function getPageType(): PageType {
    const novelColorDOM = Boolean(document.getElementById('novel_color'));
    const novelBodyDOM = Boolean(document.getElementById('novel_honbun'));
    const novelNavigationDOM = Array.from(document.getElementsByClassName('novel_bn')).length > 0;

    if (novelColorDOM && novelBodyDOM && novelNavigationDOM) {
      return 'MultiplePageBodyPage';
    }
    else if (novelColorDOM && novelBodyDOM && !novelNavigationDOM) {
      return 'SinglePageBodyPage';
    }
    else if (novelColorDOM && !novelBodyDOM && !novelNavigationDOM) {
      return 'SeriesTopPage';
    }
    else {
      return 'OtherPage';
    }
  }

  function dialogUpdateBookmark(callback: () => void) {
    const bookmarkUpdateButton = document.createElement('button');
    bookmarkUpdateButton.innerText = '追従させる';
    bookmarkUpdateButton.addEventListener('click', () => {
      callback();
      contentDOM.innerText = 'しおりを追従させます。';
    });
    contentDOM.append(bookmarkUpdateButton);
  }

  function setUpdateBookmarkByScroll(contentDOM: HTMLElement, paragraphsWithPosition: { id: string; position: number; }[], novelSubtitle: string, chapterSlug: string, id: string) {
    update();
    setInterval(update, 2000);

    let prevLatestPosition = '';

    async function update() {
      const scrollY = window.scrollY;

      const filtered = paragraphsWithPosition.filter((paragraph) => paragraph.position <= scrollY);
      const latestPosition = filtered[filtered.length - 1].id;

      if (prevLatestPosition !== latestPosition) {
        await createBookmark(id, novelSubtitle, latestPosition, chapterSlug);

        contentDOM.innerHTML = `しおりを更新中です。<br>現在の位置は 第${chapterSlug}話「${novelSubtitle}」${latestPosition} です。`;

        prevLatestPosition = latestPosition;
      }
    }
  }

  async function createNovel(novelTitle: string, novelWriterName: string, novelSlug: string): Promise<any> {
    return new Promise(resolve => {
      chrome.runtime.sendMessage({
        type: 'createNovel',
        params: {
          novelTitle,
          novelWriterName,
          novelSlug
        }
      }, resolve);
    })
  }

  async function createBookmark(id: string, novelSubtitle: string, latestPosition: string, chapterSlug: string): Promise<any> {
    return new Promise(resolve => {
      chrome.runtime.sendMessage({
        type: 'createBookmark',
        params: {
          id,
          novelSubtitle,
          latestPosition,
          chapterSlug
        }
      }, resolve);
    })
  }

  async function findNovelBySlug(slug: string): Promise<any> {
    return new Promise(resolve => {
      chrome.runtime.sendMessage({
        type: 'findNovelBySlug',
        params: {
          slug
        }
      }, resolve);
    })
  }
})();
