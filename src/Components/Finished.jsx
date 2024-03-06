import React from "react";
import { useState, useEffect } from 'react';

const Finished = (props) => {
    useEffect(() => {
        // Call getWinnerName only once when the component mounts
        props.getWinnerName();
        props.verifyVote();
    }, []); // Empty dependency array ensures that this effect runs only once


    return (
        <div className="login-container">
            <h1 className="welcome-message">Voting is Finished</h1>
            
            <>winner:<>{props.name}</></>
            <br/>

            <>your vote was counted at number <>{props.votersvoteindex}</> for candidate number <>{props.votersvote}</></>
        </div>
    )
}

export default Finished;