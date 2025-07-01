import React, { useState, useEffect } from 'react';
import faqData from '../data/faq.json';
import ChatMessage from './ChatMessage';
import ChoiceList from './ChoiceList';

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [currentNode, setCurrentNode] = useState(faqData[0]);

  const handleChoice = (choice) => {
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: choice.label }
    ]);

    if (choice.faq) {
      setMessages((prev) => [
        ...prev,
        { from: 'user', text: choice.label },
        { from: 'system', text: choice.faq }
      ]);
    } else {
      const next = faqData.find(q => q.id === choice.nextId);
      if (next) {
        setCurrentNode(next);
        setMessages((prev) => [
          ...prev,
          { from: 'system', text: next.question }
        ]);
      }
    }
  };

  useEffect(() => {
    setMessages([{ from: 'system', text: currentNode.question }]);
  }, []);

  return (
    <div>
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} from={msg.from} text={msg.text} />
      ))}
      <ChoiceList choices={currentNode.choices} onSelect={handleChoice} />
    </div>
  );
}