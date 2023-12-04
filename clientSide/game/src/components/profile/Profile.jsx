import React, { useEffect, useState } from 'react';
import "./Profile.css";
import Navbar from '../navbar/Navbar';
import scoreImg from "./images/score.jpg";
import axios from "axios";
import { useContext } from 'react';
import { store } from "../../App";

const Profile = () => {
    const [score, setScore] = useState(0);
    const [logEamil, setLogEmail] = useContext(store);
    const emailID = logEamil;
    useEffect(() => {
        const getScore = async () => {
            try {
                // Include the email data in the request
                const response = await axios.get("http://localhost:5000/api/score/");

                // Access the "players" array directly from the response data
                const players = response.data.players;

                // Check if players is an array before using find
                if (Array.isArray(players)) {
                    const playerdoc = players.find(player => player.email === emailID);

                    if (playerdoc) {
                        // Assuming the score is part of the playerdoc
                        setScore(playerdoc.score);
                    } else {
                        console.log("Player not found");
                    }
                } else {
                    console.log("Invalid response format: 'players' is not an array");
                }
            } catch (error) {
                console.log(error);
            }
        };

        getScore();
    }, [emailID]);



    return (
        <div className='profile-home'>
            <div className='profile'>
                <div className='nav-con'>
                    <div className='profile-container'>
                        <Navbar />
                    </div>
                </div>
                <img src={scoreImg} alt="score" width="80%" draggable="false" />
                <div className='score-disply'>
                    <div className='score-circle'>
                        <div className='score-heading'>
                            <h1>Your total score is</h1>
                        </div>

                        <div className='score-number'>
                            <div className='circle'>
                                <h2>{score}</h2>
                            </div>
                            <h3>Congratulations!
                                {
                                    logEamil ? "email " : "not set"
                                }
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
