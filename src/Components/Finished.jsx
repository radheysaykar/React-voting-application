
import React, { useEffect, useState } from 'react';

const Finished = (props) => {
  const [winner, setWinner] = useState(null);
  const [voteData, setVoteData] = useState(null);

  useEffect(() => {
    // Using an async function inside useEffect
    const fetchData = async () => {
      try {
        const winnerResult = await props.getWinnerName();
        setWinner(winnerResult);

        const voteResult = await props.verifyVote();
        setVoteData(voteResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Invoke the async function

    // Clean-up function if needed
    return () => {
      // Cleanup logic if needed
    };
  }, [props]); // Ensure useEffect runs when props change

  return (
    <div className="login-container">
      <h1 className="welcome-message">Voting is Finished</h1>

      {winner !== null && <p>Winner: {winner}</p>}
      
      {voteData !== null && (
        <p>
          Your vote was counted at number {voteData[1]} for candidate number {voteData[0]}
        </p>
      )}
       <button className="logout-button" onClick={props.logout}>Logout</button>
    </div>
  );
};

export default Finished;
