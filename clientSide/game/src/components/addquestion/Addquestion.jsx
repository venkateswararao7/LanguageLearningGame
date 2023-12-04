import React from 'react';
import "./addquestion.css";
import Navbar from '../navbar/Navbar';
import QuestionForm from './QuestionForm';

const Addquestion = () => {

    return (
        <div className='add-home'>
            <div className='add'>
                <div className='nav-con'>
                    <div className='add-container'>
                        <Navbar />
                    </div>
                </div>
                <div className='add-questions'>
                    <QuestionForm />
                </div>
            </div>
        </div>
    )
}

export default Addquestion;