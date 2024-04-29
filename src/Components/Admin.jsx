import React, { useState, useEffect } from 'react';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    try {
      // const response = await axios.post('http://localhost:3000/login', { username, password });
      console.log("###########");
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        throw new Error(response.message);
      }

      console.log(response.message);

      props.setAdminName(username);
      // Redirect to dashboard or handle login success
    } catch (error) {
      console.error('Login error:', error.message);
      setError(error);
    }
  };

  return (
    <div class="row d-flex flex-column justify-content-center align-items-center">
        <div class="col-md-6 text-white bg-dark-transparent p-2">

      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" class="btn btn-success" onClick={handleSubmit}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
    </div>
  );
}



function Admin({ startElection, handleAddCandidate, handleRemoveCandidate, getCandidates, candidates }) {
  const [candidateName, setCandidateName] = useState('');
  const [electionDuration, setElectionDuration] = useState(0);
  const [adminName, setAdminName] = useState(null);

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

    <div>
      {
        (adminName)?
        (<div class="row d-flex flex-column justify-content-center align-items-center">
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
              <button class="btn btn-success" onClick={handleAddCandidateClick}>Add Candidate</button>
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
      </div>):

      (<Login setAdminName = {setAdminName}/>)
    }
    </div>
  );
}

export default Admin;
