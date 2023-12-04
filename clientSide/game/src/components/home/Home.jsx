import React from 'react';
import "./Home.css";
import Navbar from '../navbar/Navbar';
import Language from './langaugeselection/Language';
const Home = () => {
    const language = ["English", "Telugu", "Hindi"];

    return (
        <div className='home'>
            <div className='home-container'>
                <div className='home-nav-container'>
                    <Navbar />
                </div>
                <div className='option-container'>
                    <div className='language-container'>
                        <h2>Select The Language You Wants to Learn</h2>
                        <Language lan={language} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home