import React, { useState, useEffect } from 'react';
// import faqData from '../data/faq.json';
import ChatMessage from './ChatMessage';
import ChoiceList from './ChoiceList';

// export default function ChatApp() {
//   const [messages, setMessages] = useState([]);
//   const [currentNode, setCurrentNode] = useState(faqData[0]);

//   const handleChoice = (choice) => {
//     setMessages((prev) => [
//       ...prev,
//       { from: 'user', text: choice.label }
//     ]);

//     if (choice.faq) {
//       setMessages((prev) => [
//         ...prev,
//         { from: 'user', text: choice.label },
//         { from: 'system', text: choice.faq }
//       ]);
//     } else {
//       const next = faqData.find(q => q.id === choice.nextId);
//       if (next) {
//         setCurrentNode(next);
//         setMessages((prev) => [
//           ...prev,
//           { from: 'system', text: next.question }
//         ]);
//       }
//     }
//   };

//   useEffect(() => {
//     setMessages([{ from: 'system', text: currentNode.question }]);
//   }, []);

//   return (
//     <div>
//       {messages.map((msg, idx) => (
//         <ChatMessage key={idx} from={msg.from} text={msg.text} />
//       ))}
//       <ChoiceList choices={currentNode.choices} onSelect={handleChoice} />
//     </div>
//   );
// }

import faq2Data from '../data/faq2.json';

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState('service');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory1, setSelectedCategory1] = useState(null);
  const [selectedCategory2, setSelectedCategory2] = useState(null);

  const handleChoice = (choice) => {
    setMessages((prev) => [...prev, { from: 'user', text: choice.label }]);

    if (step === 'service') {
      setSelectedService(choice.id);
      setStep('category_1');
      const nextChoices = faq2Data.category_1.filter(c => c.service_id === choice.id);
      setMessages((prev) => [...prev, { from: 'system', text: 'カテゴリを選んでください。' }]);
    } else if (step === 'category_1') {
      setSelectedCategory1(choice.id);
      setStep('category_2');
      const nextChoices = faq2Data.category_2.filter(c => c.category1_id === choice.id);
      setMessages((prev) => [...prev, { from: 'system', text: '詳細カテゴリを選んでください。' }]);
    } else if (step === 'category_2') {
      setSelectedCategory2(choice.id);
      setStep('faq');
      const faqs = faq2Data.FAQ.filter(f =>
        f.service_id === selectedService &&
        f.category1_id === selectedCategory1 &&
        f.category2_id === choice.id
      );
      faqs.forEach(faq => {
        setMessages((prev) => [
          ...prev,
          { from: 'system', text: `Q: ${faq.label}` },
          { from: 'system', text: `A: ${faq.answer}` }
        ]);
      });
    }
  };

  const getChoices = () => {
    if (step === 'service') {
      return faq2Data.service;
    } else if (step === 'category_1') {
      return faq2Data.category_1.filter(c => c.service_id === selectedService);
    } else if (step === 'category_2') {
      return faq2Data.category_2.filter(c => c.category1_id === selectedCategory1);
    } else {
      return [];
    }
  };

  useEffect(() => {
    setMessages([{ from: 'system', text: 'サービスを選んでください。' }]);
  }, []);

  return (
    <div>
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} from={msg.from} text={msg.text} />
      ))}
      {step !== 'faq' && (
        <ChoiceList choices={getChoices()} onSelect={handleChoice} />
      )}
    </div>
  );
}
