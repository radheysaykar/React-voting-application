
import React, { useEffect, useState } from 'react';

const Finished = (props) => {
  props.getWinnerName();

  if(!props.not_voted) props.verifyVote(); // Invoke the async function

  return (
    <div className="login-container bg-white p-8 rounded-lg shadow-md finished-container">
    <h1 className="text-3xl text-center text-emerald-500 font-semibold mb-4">Voting is Finished</h1>
    <>
        <p className="text-lg">
            Winner: {props.winner}
        </p>
        
        {props.voteData && (
            <p className="text-lg">
                Your vote was counted at number {props.voteData[1]} for  {props.voteData[0]}
            </p>
        )}
    </> 

    <button 
        className="logout-button mt-8 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
        onClick={props.logout}
    >
        Logout
    </button>
</div>

  );
};

export default Finished;
