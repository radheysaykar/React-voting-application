import React, { useState } from 'react';

const Candidates = ({ contract, getCandidates }) => {


  return (
    <div>
      <h2>Candidates</h2>
      <div>
        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          placeholder="Enter candidate name"
        />
        <button onClick={handleAddCandidate}>Add Candidate</button>
      </div>
      <ul>
        {/* Display the list of candidates */}
        {/* You can map over the candidates array and display each candidate */}
        {/* Example: candidates.map((candidate, index) => <li key={index}>{candidate.name}</li>) */}
      </ul>
    </div>
  );
};

export default Candidates;
