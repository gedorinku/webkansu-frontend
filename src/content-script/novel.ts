export function getNovelInfo() {
  const paths = location.pathname.split('/');
  const novelSlug = paths[1];

  const novelBodyDOM = document.getElementById('novel_honbun');
  if (novelBodyDOM) {
    const novelTitle = document.querySelector('#container .contents1 a:nth-child(1)')?.innerHTML;
    const novelWriterName = document.querySelector('#container .contents1 a:nth-child(2)')?.innerHTML;

    if (!novelTitle || !novelWriterName || !novelSlug) {
      throw new Error('作品の情報を取得できません');
    }
    return { novelSlug, novelTitle, novelWriterName };
  } else {
    const novelTitle = document.querySelector('#novel_contents .novel_title')?.innerHTML;
    const novelWriterName = document.querySelector('#novel_contents .novel_writername a')?.innerHTML;

    if (!novelTitle || !novelWriterName || !novelSlug) {
      throw new Error('作品の情報を取得できません');
    }
    return { novelSlug, novelTitle, novelWriterName };
  }
}

export function getChapterInfo() {
  const novelSubtitle = document.querySelector('#novel_contents .novel_subtitle')?.innerHTML;
  const paths = location.pathname.split('/');
  const chapterSlug = paths[2] ?? ''; // 章に分かれていない作品のときは chapterSlug が無いことが有り得る

  if (!novelSubtitle || !chapterSlug) {
    throw new Error('作品の情報を取得できません');
  }
  return { chapterSlug, novelSubtitle };
}
