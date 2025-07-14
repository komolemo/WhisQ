import React, { useState, useEffect, useRef } from 'react';
import { FaRedo } from 'react-icons/fa';
import useFAQ from '../utils/useFAQ';
import styles from './FAQchat.module.css'; 

const FAQchat = () => {
  // const handleSelect = (choiceId) => {
  //   processAddLogs(choiceId);
  // };
  const { getLogs, processAddLogs, processSearchLogs, logType, isResponseOver } = useFAQ(); // 
  
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [getLogs()]); // messagesが更新されるたびにスクロール

  // ログ共通のエレメント(ここからMessage, choice, QAなど分岐する)
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
    } else
    if (logType(log.from, 5)) {
      return (
        <OverError text={log.text} />
      );
    };
  };

  // メッセージエレメント...設問/応答ラベル
  const ChatMessage = ({ from, text }) => {
    return (
      <div style={{ display: 'flex', justifyContent: logType(from, 1) ? 'flex-end' : 'flex-start' }}>
        {logType(from, 0) && (
          <img src="images/icon_system.png" className="w-[54px] h-[48px]"/>
        )}
        <div
          className={`inline-block relative px-6 py-2 m-4 mt-1 text-[#EEEEEE] bg-[#1C6CB3] rounded-md ${styles[logType(from, 0) ? 'bubble_left' : 'bubble_right']}`}
        >
        {text}
        </div>
        {logType(from, 1) && (
          <img src="images/icon_user.png" className="w-[54px] h-[48px]"/>
        )}
      </div>
    );
  };

  // 選択肢エレメント
  const ChoiceList = ({ text, choice_id }) => {
    return (
      <div className="text-left pl-[54px]">
        <button
          key={choice_id}
          onClick={() => processAddLogs(choice_id)}
          disabled={isResponseOver}
          className={`
            w-[200px] ml-4 mb-1 p-2 px-6 bg-gray-100 border-none rounded-lg
            ${isResponseOver ?  '' : 'hover:bg-black/10'}
            font-normal
          `}
          // font-light
        >
          {text}
        </button>
      </div>
    );
  };

  // Q&Aエレメント...最終的に絞り込んだQA,Qのみが表示され,押下するとさらに展開されてAが表示される
  const QAMessage = ({question, answer}) => {
    const [isAnswerOpened, setAnswerOpened] = useState(false);
    // Qエレメント
    const QuestionElem = ({question}) => {
      return (
        <div
        className="flex items-baseline"
        >
          <p className="text-[20px] text-[#1C6CB3] m-[8px]">Q</p>
          <div style={{ margin:'4px' }} className="text-sm">
            {question.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br/>
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    };
    // Aエレメント
    const AnswerElem = ({answer}) => {
      return (
        <div
        className="flex items-baseline"
        >
          <p className="text-[20px] text-[#1C6CB3] m-[8px]">A</p>
          <div style={{ margin:'4px' }} className="text-sm">
            {answer.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br/>
              </React.Fragment>
            ))}
          </div>
        </div>
      )
    };
    
    return (
      <div
        className="text-left mx-8 py-4 px-6 m-1 bg-[#E6F6FD] rounded-lg flex relative"
        onClick={() => setAnswerOpened(!isAnswerOpened)}
      >
        <div>
          {/* Question */}
          <QuestionElem question={question}/>
          {/* Answer */}
          {isAnswerOpened && (
            <AnswerElem answer={answer}/>
          )}
          {/* <div className="absolute bottom-[-15px] left-5 w-0 h-0 border-[10px] border-transparent border-t-gray-100"></div> */}
        </div>
        {/* 開閉表示 */}
        <img
          src="/images/caret-down.svg"
          alt="caret down"
          className="
            sm:w-[12px] md:w-[12px] lg:w-[18px]
            absolute right-9 top-8
          "
          style={{
            transform: `scaleY(${isAnswerOpened ? -1 : 1})`
          }}
        />
      </div>
    );
  };

  const OverError = ({ text }) => {
    const ReloadButton = () => {
      const handleReload = () => {
        window.location.reload();
      };

      return (
        <button
          onClick={handleReload}
          className="
            w-[200px] ml-4 mb-1 p-2 px-6 bg-gray-100 border-none rounded-lg
            hover:bg-black/10
            font-normal
        ">
          <FaRedo className="mr-2" />
          再読み込み
        </button>
      );
    }
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <img src="../../public/images/icon_system.png" className="w-[54px] h-[48px]"/>
          <div
            className={`inline-block relative px-6 py-2 m-4 mt-1 text-[#EEEEEE] bg-[#1C6CB3] rounded-md bubble_left`}
            >
            {text}
          </div>
        </div>
        <ReloadButton/>
      </div>
    );
  };

  const Search = () => {
    const [word, setWord] = useState('');
    const handleClick = (event) => {
        setWord(event.target.value);
        processSearchLogs(word);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // エンターキーが押されたときの処理をここに書く
            setWord(event.target.value)
            processSearchLogs(word);
            // ここにメソッドを呼び出すコードを追加
        }
    };
    return (
      <div
        className="flex items-center mt-4 p-2 gap-6 bg-[#eee]"
      >
        <input
          type="text"
          className="flex-1 p-2 px-3 rounded-l-md border border-[#ccc] text-base"
          placeholder="質問はこちら（短い単語を入力）"
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isResponseOver}
        />
        <button
          className={`
            w-[150px] h-[36px] bg-[#1C6CB3] font-noto text-white
            ${isResponseOver ? '' : 'hover:bg-black/10'}
          `} // #1C6CB3
          onClick={handleClick}
          disabled={isResponseOver}
        >質問する</button>
      </div>
    );
  };

  return (
    <div
        className="w-[896px] border-2 border-gray-100 p-12"
    >
      <div
        className="h-[448px] overflow-y-scroll overflow-x-hidden"
      >
          {getLogs().map((log, index) => (
            <LogElem key={index} log={log} />
          ))}
          <div ref={endRef}/> 
      </div>
      <Search/>
    </div>
  );
};

export default FAQchat;