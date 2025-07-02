import React from 'react';

export default function ChatMessage({ from, text }) {
  console.log({ from, text })
  return (
    <div style={{ textAlign: from === 'user' ? 'right' : 'left' }}>
      <div style={{ display: 'inline-block', padding: '6px', margin: '4px', backgroundColor: '#eee' }}>
        {text}
      </div>
    </div>
  );
}