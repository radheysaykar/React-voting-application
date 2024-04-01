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

    return (
    <div className="connected-container">
    <p className="connected-account">Account: {props.voterID}</p>
    <p className="connected-account">Remaining Time: {props.remainingTime}</p>
    {props.canVote ? (
        <div className="flex flex-col items-center">
            <input 
                type="number" 
                placeholder="Enter Candidate Index" 
                value={candidateNumber} 
                onChange={handleInputChange}
                className="mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
            />
            <button 
                className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 focus:outline-none focus:bg-emerald-600"
                onClick={callVote}
            >
                Vote
            </button>
        </div>
    ) : (
        <p className="connected-account">You cannot vote</p>
    )}

    <table id="myTable" className="candidates-table mt-8">
        <thead>
            <tr>
                <th className="px-4 py-2">Index</th>
                <th className="px-4 py-2">Candidate Name</th>
            </tr>
        </thead>
        <tbody>
            {props.candidates.map((candidate, index) => (
                <tr key={index}>
                    <td className="px-4 py-2">{candidate.index}</td>
                    <td className="px-4 py-2">{candidate.name}</td>
                </tr>
            ))}
        </tbody>
    </table>
    
    <button 
        className="logout-button mt-8 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
        onClick={props.logout}
    >
        Logout
    </button>
</div>

    )
}

export default Connected;