import React, { useState, useEffect } from 'react';

function Admin({ startElection, handleAddCandidate, handleRemoveCandidate, getCandidates, candidates }) {
  const [candidateName, setCandidateName] = useState('');
  const [electionDuration, setElectionDuration] = useState(0);

  if (Array.isArray(candidates) && candidates.length === 0) {
        getCandidates();
    }

  
  const handleAddCandidateClick = () => {
    if (candidateName.trim() !== '') {
      handleAddCandidate(candidateName);
      setCandidateName('');
    }
  };

  const handleRemoveCandidateClick = (index) => {
    handleRemoveCandidate(index);
  };

  const handleStartElectionClick = () => {
    if (electionDuration.trim() !== '') {
      startElection(electionDuration);
      setElectionDuration(0);
    }
  };

  return (
    // <div>
    //   <h2>Admin Panel</h2>

    //   <div>
    //     <h3>Add Candidate</h3>
    //     <input
    //       type="text"
    //       placeholder="Candidate Name"
    //       value={candidateName}
    //       onChange={(e) => setCandidateName(e.target.value)}
    //     />
    //     <button onClick={handleAddCandidateClick}>Add Candidate</button>
    //   </div>

    //   <div>
    //     <h3>Remove Candidate</h3>

    //      {candidates.map((candidate, index) => (
    //         <div key={index}>
    //           <span>{candidate.name}</span>
    //           <button onClick={() => handleRemoveCandidateClick(index)}>Remove</button>
    //         </div>
    //       ))}
    //   </div>

    //   <div>
    //     <h3>Start Election</h3>
    //     <input
    //       type="text"
    //       placeholder="Duration in Minutes"
    //       value={electionDuration}
    //       onChange={(e) => setElectionDuration(e.target.value)}
    //     />
    //     <button onClick={handleStartElectionClick}>Start Election</button>
    //   </div>
    // </div>

    <div class="container">
    <div class="row d-flex flex-column justify-content-center align-items-center">
      <div class="col-md-6 text-white bg-dark-transparent">
        <h2>Admin Panel</h2>
  
        {/* <!-- Black transparent box to highlight important areas --> */}
        <div class="p-3 mb-4">
          <h3>Add Candidate</h3>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Candidate Name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
            <button class="btn btn-primary" onClick={handleAddCandidateClick}>Add Candidate</button>
          </div>
        </div>
  
        {/* <!-- Table for Candidate List --> */}
        <div class="table-responsive">
          <table class="table table-bordered table-striped text-white">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index}>
                  <td>{candidate.name}</td>
                  <td><button class="btn btn-danger" onClick={() => handleRemoveCandidateClick(index)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* <!-- Black transparent box to highlight important areas --> */}
        <div class=" p-3 mt-4">
          <h3>Start Election</h3>
          <div class="input-group">
            <input
              type="number"
              class="form-control"
              placeholder="Duration in Minutes"
              value={electionDuration}
              onChange={(e) => setElectionDuration(e.target.value)}
            />
            <button class="btn btn-success" onClick={handleStartElectionClick}>Start Election</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  

  );
}

export default Admin;
