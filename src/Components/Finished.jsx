
import React, { useEffect, useState } from 'react';

const Finished = (props) => {
  props.getWinnerName();

  if(!props.not_voted) props.verifyVote(); // Invoke the async function

  return (
    <div className="login-container p-4 rounded-lg shadow-sm finished-container">
  <div className="bg-dark-transparent text-white rounded p-3 mb-4">
    <h1 className="text-3xl text-center font-weight-bold mb-4">Voting is Finished</h1>
    <>
      <p className="text-lg">
        Winner: {props.winner}
      </p>

      {props.voteData && (
        <p className="text-lg">
          Your vote was counted at number {props.voteData[1]} for {props.voteData[0]}
        </p>
      )}
    </>
  </div>

  <button
    className="btn btn-danger mt-4 px-4 py-2 rounded-lg"
    onClick={props.logout}
  >
    Logout
  </button>
</div>
  );
};

export default Finished;
