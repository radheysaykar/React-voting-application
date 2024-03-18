
import React, { useEffect, useState } from 'react';

const Finished = (props) => {
  const [winner, setWinner] = useState(null);
  const [voteData, setVoteData] = useState(null);
  // const winner = await props.getWinnerName();
  // const voteData = await props.verifyVote();


  // useEffect(() => {
  //   // Using an async function inside useEffect
    const fetchData = () => {

        props.getWinnerName()
        .then(
          (res) =>{
            setWinner(res);
          }
        )
        .catch(
          (err) => {
            console.log(err);
          }
        )
        
        props.verifyVote()
        .then(
          (res) =>{
            setVoteData(res);
          }
        )
        .catch(
          (err) => {
            console.log(err);
          }
        )
    };

    if(!props.not_voted) fetchData(); // Invoke the async function

  return (
    <div className="login-container">
      <h1 className="welcome-message">Voting is Finished</h1>

      { console.log(1, voteData)}
      {
        (!props.not_voted)? (
          <>
            <p>Winner: candidate no. {winner}</p>
              
            {voteData && (
            <>
              <p>
                Your vote was counted at number {voteData[1]} for candidate number {voteData[0]}
              </p>
            </>)}
          </> 
        ) :
          (
          <>
            
          </> 
        )
      }

      <button className="logout-button" onClick={props.logout}>Logout</button>
    </div>
  );
};

export default Finished;
