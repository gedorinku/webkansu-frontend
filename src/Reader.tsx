import React from 'react';
import './Reader.css';

type ReaderProps = {
  text: string;
}

function Reader(props: ReaderProps) {
  return (
    <div className="Reader">
      <div className="container">
        {props.text}
      </div>
    </div>
  );
}

export default Reader;
