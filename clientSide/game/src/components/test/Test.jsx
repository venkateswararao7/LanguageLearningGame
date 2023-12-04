import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import './Test.css';
import { store } from '../../App';

const Test = (props) => {
    const [logEamil, setLogEmail] = useContext(store);
    const location = useLocation();
    const language = location.state?.selectedLanguage || '';
    const email = logEamil || location.state?.email || 'fkmvk';
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [marks, setMarks] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [displayColor, setDisplayColor] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/question/${language}`);
                setQuestions(response.data.ques);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuestions();
    }, [language]);

    useEffect(() => {
        const updateScore = async () => {
            const data = {
                email: email,
                score: marks
            };

            try {
                console.log(data);
                const res = await axios.post("http://localhost:5000/api/update", data);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };

        if (currentQuestionIndex === questions.length) {
            updateScore();
            console.log("helllo");
        }
    }, [marks, currentQuestionIndex, email, questions.length]);

    const handleOptionChange = (selectedOption) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentQuestionIndex]: selectedOption,
        }));
    };

    const handleSubmit = () => {
        // Check the answer for the current question
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswer = currentQuestion.correct;

        if (userAnswers[currentQuestionIndex] === correctAnswer) {
            // Increment marks based on the level
            setMarks((prevMarks) => prevMarks + getMarksByLevel(currentQuestion.level));
            setIsCorrect(true);
            setDisplayColor('green');
        } else {
            setIsCorrect(false);
            setDisplayColor('red');
        }

        // Wait for 3 seconds before moving to the next question
        setTimeout(() => {
            // Move to the next question
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setIsCorrect(null);
            setDisplayColor(null);
        }, 3000);
    };

    const getMarksByLevel = (level) => {
        switch (level) {
            case 'easy':
                return 1;
            case 'medium':
                return 3;
            case 'hard':
                return 5;
            default:
                return 0;
        }
    };

    return (
        <div className='test-home'>
            <div className='test'>
                <div className='nav-con'>
                    <div className='test-container'>
                        <Navbar />
                    </div>
                </div>
                <div className='test-questions'>
                    {questions.length > 0 && currentQuestionIndex < questions.length ? (
                        <div key={currentQuestionIndex} className='question-container'>
                            <div>
                                <p>{currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}</p>

                                {questions[currentQuestionIndex].option.map((option, optionIndex) => (
                                    <div
                                        key={optionIndex}
                                        className={`ques-option ${displayColor === 'green' && optionIndex === questions[currentQuestionIndex].correct ? 'correct' : ''} ${displayColor === 'red' && optionIndex === userAnswers[currentQuestionIndex] ? 'incorrect' : ''}`}
                                    >
                                        <input
                                            type='radio'
                                            name='currentQuestion'
                                            value={optionIndex}
                                            onChange={() => handleOptionChange(optionIndex)}
                                            checked={userAnswers[currentQuestionIndex] === optionIndex}
                                            className='choose-option'
                                        />
                                        <label>{option}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>No more questions available!</p>
                    )}
                    {currentQuestionIndex === questions.length && (
                        <div>
                            <p>Total Marks: {marks}</p>
                        </div>
                    )}
                    {currentQuestionIndex < questions.length && (
                        <button onClick={handleSubmit}>Submit and Next Question</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Test;
