import React, { useEffect, useState } from 'react';

import questionsJson from '../data/questions.json';
import choicesJson from '../data/choices.json';
import answersJson from '../data/answers.json';

const useFAQ = () => {
    const [faqs, setFaqs] = useState({
            questions: questionsJson,
            choices: choicesJson,
            answers: answersJson,
        });
    const [error, setError] = useState(null);
    const [logs, setLog] = useState([]);

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

    useEffect(() => {
        initLog();
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

    // condition_list

    const questionByChoice = (choice_id) => {
        return questions().find(q => q.choice_id === choice_id) || null;
    };

    const choicesByQuestion = (question_id) => {
        return choices().filter(c => c.question_id === question_id) || [];
    };

    const answersByChoice = (choice_id) => {
        return choices().filter(a => a.choice_id === choice_id) || [];
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
        return choicesByQuestion(choice_id).length > 0;
    };

    const isAnswerExist = (choice_id) => {
        return answersByChoice(choice_id).length > 0;
    };

    // 

    const initLog = () => {
        const initialQ = questionByChoice(1)
        const initialLog = questionLog(initialQ);
        // addLog(initialLog);
        // const c = choicesByQuestion(1).map(c => choiceLog(c));
        // addLogs(c);
    };

    const logsFromChoices = (choice_id) => {
        const l = label(choice(choice_id));
        if (isQuestionExist(choice_id)) {
            const q = questionLog(questionByChoice(choice_id));
            const c = choicesByQuestion(q.id).map(c => choiceLog(c));
            return [l, q, ...c];
        } else
        if (isAnswerExist(choice_id)) {
            const qas = answersByChoice(choice_id).map(qa => answerLog(qa));
            return [l, ...qas];
        }
        const errorLog = systemLog(0, '該当するカテゴリーが存在しません')
        return [l, errorLog];
    };

    const systemValue = 'system';
    const userValue = 'user';
    const choiceValue = 'choice';

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

    const systemLog = (from, text, choiceId) => {
        const subject = [systemValue, userValue, choiceValue][from];
        return {'from': subject, 'text': text, 'choiceId': choiceId || null};
    };

    const questionLog = (q) => {
        return systemLog(0, q.text);
    };

    const label = (c) => {
        return systemLog(1, c.text);
    };

    const choiceLog = (c) => {
        return systemLog(2, c.text, c.id);
    };

    const answerLog = (QA) => {
        const q = systemLog(0, QA.question);
        const a = systemLog(0, QA.answer);
        return [q, a];
    };

    const addLog = (log) => {
        setLog((prev) => [...prev, log]);
    };

    const addLogs = (logs) => {
        setLog((prev) => [...prev, ...logs]);
    };

    const processAddLogs = (choice_id) => {
        const newLogs = logsFromChoices(choice_id);
        addLogs(newLogs);
    };

    const getLogs = () => {
        return logs;
    }

    return {
        questions, choices, answers,
        questionByChoice, choicesByQuestion, answersByChoice,
        question, choice, answer,
        logsFromChoices, initLog, addLog,
        getLogs, processAddLogs,
        isSystem, isUser, isChoice, isMessage
    };
};

export default useFAQ;