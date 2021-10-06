import React, { useState } from 'react';
import { css } from '@linaria/core'

type ReaderProps = {
  text: string;
}

function Reader(props: ReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const lineHeight = 1.7;
  const numberOfLines = 16;

  const reader = css`
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const pageContainer = css`
    writing-mode: vertical-rl;
    line-height: ${lineHeight}em;
    position: relative;
    width: ${lineHeight * numberOfLines}em;
    overflow: hidden;
    border: 1px solid #ccc;
    height: 80%;
  `;

  const page = css`
    position: relative;
    white-space: pre-wrap;
    height: 100%;
  `;

  return (
    <div className={reader}>
      <button onClick={() => setCurrentPage(page => page + 1)}>&lt;</button>
      <button onClick={() => setCurrentPage(page => page - 1)}>&gt;</button>
      <div className={pageContainer}>
        <div className={page} style={{ 'transform': `translateX(${currentPage * lineHeight * numberOfLines}em)` }}>
          {props.text}
        </div>
      </div>
    </div>
  );
}

export default Reader;
