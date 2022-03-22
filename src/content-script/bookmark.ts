export const calculateParagraphPosition = () => {
  const paragraphs = document.getElementById('novel_honbun')?.children;

  if (!paragraphs) return [];

  // id="#Ln" の p 要素が何個があるかを元に計算
  return Array.from(paragraphs).map(paragraph => {
    return {
      id: paragraph.id,
      position: window.pageYOffset + paragraph.getBoundingClientRect().top
    }
  });
}
