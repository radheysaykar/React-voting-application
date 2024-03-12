import React from "react";
import { useState, useEffect } from 'react';

const Connected = (props) => {
    const [candidateNumber, setCandidateNumber] = useState(0); 

    const callVote = () => {
        props.vote(candidateNumber);
    };
    const handleInputChange = (event) => {
        const newValue = parseInt(event.target.value, 10); // Convert input value to an integer
        setCandidateNumber(newValue);
      };
// console.log("props.voterID... ", props.voterID);
    return (
        <div className="connected-container">
            <p className="connected-account"> Account: {props.voterID}</p>
            <p className="connected-account">Remaining Time: {props.remainingTime}</p>
            { props.CanVote ? (
                <div>
                    <input type="number" placeholder="Entern Candidate Index" value={candidateNumber} onChange={handleInputChange}></input>
                <br />
                <button className="login-button" onClick={callVote}>Vote</button>

                    </div>
                ) :
                (
                    <p className="connected-account">You can not vote</p>
                )
            }
            
            <table id="myTable" className="candidates-table">
                <thead>
                <tr>
                    <th>Index</th>
                    <th>Candidate name</th>
                    {/* <th>Candidate votes</th> */}
                </tr>
                </thead>
                <tbody>
                {props.candidates.map((candidate, index) => (
                    <tr key={index}>
                    <td>{candidate.index}</td>
                    <td>{candidate.name}</td>
                    {/* <td>{candidate.voteCount}</td> */}
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="logout-button" onClick={props.logout}>Logout</button>

        </div>
    )
}

export default Connected;