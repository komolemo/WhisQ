import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChoiceList from './ChoiceList';
import FAQ from '../utils/manager'

// message = [{ from: '', text: '' }, { from: '', text: '' }, { from: '', text: '' }];

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0);
  const [currentObj, setCurrent] = useState('');
  const [nextObj, setNext] = useState(FAQ()['next']);

  const handleChoice = (choice) => {
    const { current, next } = FAQ(choice);
    setCurrent(current);
    setNext(next);
    setStep(next[0]['type'])
    console.log(next[0]['type'])
  
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: currentObj['label'] }, // 選択したものを表示
      { from: 'systetm', text: nextObj['question'] }, // 選択に応じた設問を表示
    ]);
    console.log(messages.length)
  };

  const getChoices = (next) => {
    if (!next) {
      return {}
    };
    return next;
  };

  useEffect(() => {
    setMessages([{ from: 'system', text: 'サービスを選んでください。' }]);
  }, []);

  return (
    <div>
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} from={msg.from} text={msg.text} />
      ))}
      {step < 3 && (
        <ChoiceList choices={nextObj} onSelect={handleChoice} />
      )}
    </div>
  );
}
