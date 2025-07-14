import React, { useEffect, useState, useRef } from 'react';

import questionsJson from '../data/faq/questions.json';
import choicesJson from '../data/faq/choices.json';
import answersJson from '../data/faq/answers.json';

const useFAQ = () => {
    const [faqs, setFaqs] = useState({
            questions: questionsJson,
            choices: choicesJson,
            answers: answersJson,
        });
    const [logs, setLogs] = useState([]);
    const [numResponses, setNumResponses] = useState(0);
    const [isResponseOver, setResponseOver] = useState(false);

//   useEffect(() => {
//     fetch('http://localhost:8000/api/faqs/')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setFaqs(data);
//       })
//       .catch((err) => {
//         console.error('Fetch error:', err);
//         setError(err.message);
//       });
//   }, []);

    const initialized = useRef(false); // 初期化フラグ

    useEffect(() => {
        if (!initialized.current) {
            initLog();
            initialized.current = true;
        }
    }, []);

    // all_list
    const questions = () => {
        return faqs['questions'];
    };

    const choices = () => {
        return faqs['choices'];
    };

    const answers = () => {
        return faqs['answers'];
    };

    const answersIncludesWord = (word) => {
        return answers().filter(qa => (qa.answer.includes(word) || qa.question.includes(word)));
    };

    // condition_list

    const questionByChoice = (choice_id) => {
        return questions().find(q => q.choice_id === choice_id) || null;
    };

    const choicesByQuestion = (question_id) => {
        return choices().filter(c => c.question_id === question_id) || [];
    };

    const answersByChoice = (choice_id) => {
        return answers().filter(a => a.choice_id === choice_id) || [];
    };

    // one
    const question = (id) => {
        return questions().find(q => q.id === id) || null;
    };

    const choice = (id) => {
        return choices().find(c => c.id === id) || null;
    };

    const answer = (id) => {
        return answers().find(c => c.id === id) || null;
    };

    const isQuestionExist = (choice_id) => {
        return Boolean(questionByChoice(choice_id));
    };

    const isAnswerExist = (choice_id) => {
        return answersByChoice(choice_id).length > 0;
    };

    // 

    const initLog = () => {
        const initialQ = questionByChoice(1);
        console.log(questionsJson)
        const initialLog = questionLog(initialQ);
        const c = choicesByQuestion(1).map(c => choiceLog(c));
        addLog(initialLog);
        addLogs(c);
    };

    const logsFromChoices = (choice_id) => {
        const l = label(choice(choice_id));
        if (isAnswerExist(choice_id)) {
            const qas = answersByChoice(choice_id).map(qa => answerLog(qa));
            return [l, ...qas];
        } else
        if (isQuestionExist(choice_id)) {
            const q = questionByChoice(choice_id)
            const ql = questionLog(q);
            console.log(q)
            const c = choicesByQuestion(q.id).map(c => choiceLog(c));
            return [l, ql, ...c];
        }
        const errorLog = systemLog(0, '該当するカテゴリーが存在しません')
        return [l, errorLog];
    };

    const logsFromSearch = (word) => {
        const l = inputLabel(word);
        const qas = answersIncludesWord(word).map(qa => answerLog(qa));
        return [l, ...qas];
    };

    const systemValue = 'system';
    const userValue = 'user';
    const choiceValue = 'choice';
    const answerValue = 'answer';
    const overValue = 'over';

    const isSystem = (from) => {
        return (from === systemValue);
    };

    const isUser = (from) => {
        return (from === userValue);
    };

    const isChoice = (from) => {
        return (from === choiceValue);
    };
    
    const isMessage = (from) => {
        return [systemValue, userValue].includes(from);
    };
    
    const isAnswer = (from) => {
        return (from === answerValue);
    };

    const isOverError = (from) => {
        return (from === overValue);
    };

    const logType = (from, type) => {
        switch(type) {
            case 0:
                return isSystem(from);
            case 1:
                return isUser(from);
            case 2:
                return isChoice(from);
            case 3:
                return isMessage(from);
            case 4:
                return isAnswer(from);
            case 5:
                return isOverError(from);
            default:
                return false
        };
    };

    const systemLog = (from, text) => {
        const subject = [systemValue, userValue, choiceValue, answerValue, overValue][from];
        return {'from': subject, 'text': text};
    };

    const questionLog = (q) => {
        const log = systemLog(0, q.text);
        log['questionId'] = q.id;
        return log;
    };

    const label = (c) => {
        return systemLog(1, c.text);
    };

    const inputLabel = (word) => {
        return systemLog(1, word);
    }

    const choiceLog = (c) => {
        const log = systemLog(2, c.text);
        log['choiceId'] = c.id;
        return log;
    };

    const answerLog = (QA) => {
        const q = systemLog(3, [QA.question, QA.answer]);
        return q;
    };

    const addLog = (log) => {
        setLogs((prev) => [...prev, log]);
    };

    const addLogs = (newLogs) => {
        setLogs((prev) => [...prev, ...newLogs]);
    };

    const processAddLogs = (choice_id) => {
        const newLogs = logsFromChoices(choice_id);
        addLogs(newLogs);
        processResponseOver();
    };

    const processSearchLogs = (word) => {
        const newLogs = logsFromSearch(word);
        addLogs(newLogs);
        processResponseOver();
    };

    const processResponseOver = () => {
        setNumResponses(numResponses + 1);
        if (numResponses >= maxResponse()) {
            addLog(overErrorLog());
            console.log(overErrorLog())
            console.log(logs)
            setResponseOver(true);
        };
    };

    const getLogs = () => {
        return logs;
    };

    const overErrorLog = () => {
        return systemLog(4, '表示可能件数が規定数を超過しました。ページを再読み込みしてください。');
    };

    const maxResponse = () => {
        return 10;
    };

    return {
        getLogs, processAddLogs, processSearchLogs,
        logType, isResponseOver
    };
};

export default useFAQ;