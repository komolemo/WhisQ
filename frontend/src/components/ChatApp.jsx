import React, { useState, useEffect, useRef } from 'react';
import useFAQ from '../utils/useFAQ';

const ChatApp = () => {
  // const handleSelect = (choiceId) => {
  //   processAddLogs(choiceId);
  // };
  const { getLogs, processAddLogs, processSearchLogs, logType } = useFAQ(); // 
  
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [getLogs()]); // messagesが更新されるたびにスクロール


  const LogElem = ({log}) => {
    if (logType(log.from, 4)) {
      return (
        <QAMessage question={log.text[0]} answer={log.text[1]}/>
      );
    } else
    if (logType(log.from, 3)) {
      return (
        <ChatMessage from={log.from} text={log.text} />
      );
    } else
    if (logType(log.from, 2)) {
      return (
        <ChoiceList text={log.text} choice_id={log.choiceId} />
      );
    };
  };

  const ChatMessage = ({ from, text }) => {
    return (
      <div style={{ textAlign: logType(from, 1) ? 'right' : 'left' }}>
        <div style={{
          display: 'inline-block',
          padding: '16px 24px', margin: '16px 4px 4px',
          color: '#EEEEEE',
          backgroundColor: '#003399',
          borderRadius: '6px',
        }}>
          {text}
        </div>
      </div>
    );
  }

  const ChoiceList = ({ text, choice_id }) => {
    return (
      <div style={{ textAlign: 'center'}}>
        <button key={choice_id} onClick={() => processAddLogs(choice_id)}
          style={{
            width:'200px',
            margin: '4px', padding: '8px 16px',
            backgroundColor: 'skyblue',
            border: 'none', borderRadius: '6px',
          }}
          className='w-[200px] m-1 p-2 px-4 bg-sky-300 hover:bg-sky-500 border-none rounded-md'
        >
          {text}
        </button>
      </div>
    );
  };

  const QAMessage = ({question, answer}) => {
    const [isAnswerOpened, setAnswerOpened] = useState(false);
    return (
      <div
        style={{
          textAlign: 'left',
          padding: '16px 24px', margin: '4px',
          backgroundColor: 'skyblue',
          borderRadius: '10px',
        }}
        className="relative bg-gray-100 rounded-xl px-4 py-2 max-w-[300px] m-4 font-sans"
        onClick={() => setAnswerOpened(!isAnswerOpened)}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
          }}
          className="flex"
        >
          <p style={{ fontSize:'28px', margin:'8px' }} className="text-lg">Q</p>
          <p style={{ margin:'4px' }} className="text-sm">{question}</p>   
        </div>     
        {isAnswerOpened && (
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
            }}
          >
            <p style={{ fontSize:'28px', margin:'8px' }} className="text-lg">A</p>
            <p style={{ margin:'4px' }} className="text-sm">{answer}</p>
          </div>
        )}
        <div className="absolute bottom-[-15px] left-5 w-0 h-0 border-[10px] border-transparent border-t-gray-100"></div>
      </div>
    );
  };

  const Search = () => {
    const [word, setWord] = useState('');
    return (
      <div style={{
          bottom: '0',
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
          gap: '24px',
          width: '864px',
          backgroundColor: '#eee',
        }}
        class="search-container"
      >
        <input
          style={{
            flex: '1',
            padding: '8px 12px',
            borderRadius: '6px 0px 0px 6px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
          type="text" class="search-input" placeholder="検索ワードを入力"
          onChange={(e) => setWord(e.target.value)}
        />
        <button
          style={{width: '150px', height: '36px'}} class="search-button"
          onClick={() => processSearchLogs(word)}
        >検索</button>
      </div>
    );
  };

  return (
    <div style={{
      width: '896px',
      border: '4px rgb(165, 165, 165) solid',
      padding: '48px',
    }}>
      <div
        style={{
          height: '576px',
          overflowY: 'scroll',
          overflowX: 'hidden',
          backgroundColor: '#ecf3fe',
        }}
        className="w-4xl "
      >
          {getLogs().map(log => (
            <LogElem log={log} />
          ))}
        <div ref={endRef} />
      </div>
      <Search/>
    </div>
  );
};

export default ChatApp;