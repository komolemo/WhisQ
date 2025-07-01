import React from 'react';

export default function ChoiceList({ choices, onSelect }) {
  return (
    <div>
      {choices.map(choice => (
        <button key={choice.id} onClick={() => onSelect(choice)} style={{ margin: '4px' }}>
          {choice.label}
        </button>
      ))}
    </div>
  );
}