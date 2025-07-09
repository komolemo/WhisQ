import React, { useState, useEffect } from 'react';
import useFAQ from '../utils/useFAQ';

const ChatApp = () => {
  // const handleSelect = (choiceId) => {
  //   processAddLogs(choiceId);
  // };
  const { getLogs, processAddLogs, isSystem, isUser, isChoice, isMessage } = useFAQ(); // 

  const LogElem = ({log}) => {
    if (isMessage(log.from)) {
      return (
        <ChatMessage from={log.from} text={log.text} />
      );
    } else
    if (isChoice(log.from)) {
      return (
        <ChoiceList text={log.text} choice_id={log.choiceId} />
      );
    };
  };

  const ChatMessage = ({ from, text }) => {
    return (
      <div style={{ textAlign: isUser(from) ? 'right' : 'left' }}>
        <div style={{ display: 'inline-block', padding: '6px', margin: '4px', backgroundColor: '#eee' }}>
          {text}
        </div>
      </div>
    );
  }

  const ChoiceList = ({ text, choice_id }) => {
    return (
      <div>
        <button key={choice_id} onClick={() => processAddLogs(choice_id)} style={{ margin: '4px' }}>
          {text}
        </button>
      </div>
    );
  };

  return (
    <div>
      {getLogs().map(log => (
        <LogElem log={log} />
      ))}
    </div>
  );
};

export default ChatApp;