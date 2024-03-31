
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
    <div className="login-container bg-white p-8 rounded-lg shadow-md">
    <h1 className="text-3xl text-center text-emerald-500 font-semibold mb-4">Voting is Finished</h1>

    {voteData && console.log(1, voteData)}
    {!props.not_voted ? (
        <>
            <p className="text-lg">
                Winner: candidate no. {winner}
            </p>
            
            {voteData && (
                <p className="text-lg">
                    Your vote was counted at number {voteData[1]} for candidate number {voteData[0]}
                </p>
            )}
        </> 
    ) : (
        <></>
    )}

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
