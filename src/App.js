import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import {ethers} from 'ethers';
import PhoneNoLogin from './Components/PhoneNoLogin.jsx';
import Finished from './Components/Finished';
import Admin from './Components/Admin';
import Registration from './Components/registration.jsx';
import Connected from './Components/Connected';
import './App.css';

function App() {
  const [votingStatus, setVotingStatus] = useState(false);
  const [remainingTime, setremainingTime] = useState('');
  const [electionStartedStatus, setElectionStartedStatus] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [CanVote, setCanVote] = useState(false);
  const [voterID, setvoterID] = useState(null);
  const [winner, setWinner] = useState(null);
  const [voteData, setVoteData] = useState(null);
  const [contract, setContract] = useState(null);
  const CONTRACT_ADDRESS ="0x3cF8493397289FF35F21BF4286cbd6392Ec4491d"
  const PRIVATE_KEY = "b3409f6f45ef522faf29c052914d13511ac5c6515aea2d138c6b9d70341815cf"
  const API_URL = "https://volta-rpc.energyweb.org"
  const SimpleStorageABI =  [
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "_candidateNames",
          "type": "string[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "voterID",
          "type": "string"
        }
      ],
      "name": "VerifyVote",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionStarted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "getCandidate",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.Candidate",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getIndexOfMaxVoteCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRemainingTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getVotingStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "voterID",
          "type": "string"
        }
      ],
      "name": "hasVoted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastcandidateindex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "removeCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_durationInMinutes",
          "type": "uint256"
        }
      ],
      "name": "startElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "voterID",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  useEffect(() => {
    // async function fetchContract() {
      const provider = new ethers.JsonRpcProvider(API_URL);
    
      const signer = new ethers.Wallet(PRIVATE_KEY, provider); 
    
      setContract(new ethers.Contract(CONTRACT_ADDRESS, SimpleStorageABI, signer));
    // }

  }, []);

  useEffect(() => {
    if(contract){
      getCandidates();
      electionStarted();
    }

  }, [contract]);

  useEffect(() => {
    
        getCandidates();
        
      }, [voterID]);
      
  useEffect( () => {
    getRemainingTime();
    getCurrentStatus();
    console.log("electionStartedStatus...", electionStartedStatus)
  });

  useEffect( () => {

    canVote();
  }, [voterID]);

async function vote(candidateNumber) {
  try {
    if (!contract) return;

    console.log(voterID, candidateNumber);
    const tx = await contract.vote(voterID, parseInt(candidateNumber, 10));

    await tx.wait();
    console.log("voting successful");
    toast.success('Voting successful! Thank you for your voting!');

    await canVote();
  } catch (error) {
    console.error('Error while voting:', error);
    toast.error('Error while voting. Please try again later.');
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

async function canVote() {
  try {
    if (!contract) return;

    const voteStatus = await contract.hasVoted(voterID);
    console.log("voting done:", voteStatus);
    setCanVote(!voteStatus);
    console.log("canvote:", CanVote);
  } catch (error) {
    console.error('Error while checking voting status:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

// const getCandidateNameByIndex = (index) => {
//   // Find the candidate object with the specified index
//   const candidate = candidates.find(candidate => candidate.index === index);

//   // Return the name of the candidate, or null if not found
//   return candidate ? candidate.name : null;
// };

async function verifyVote() {
  try {
    if (!contract) return;

    const [vote, voteIndex] = await contract.VerifyVote(voterID);
    const numberA = Number(vote);
    const numberB = Number(voteIndex);
    console.log(numberA, numberB, "#######");
    const candidate = await contract.getCandidate(numberA);
    setVoteData([candidate.name, numberB]);
  } catch (error) {
    console.error('Error while verifying vote:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

// async function getCandidates() {
//   try {
//     if (!contract) return;

//     const candidatesList = await contract.getAllVotesOfCandiates();
//     const formattedCandidates = candidatesList.map((candidate, index) => ({
//       index: index,
//       name: candidate.name,
//       // voteCount: candidate.voteCount.toNumber()
//     }));
//     setCandidates(formattedCandidates);
//   } catch (error) {
//     console.error('Error while fetching candidates:', error);
//     // Handle error gracefully (e.g., show an error message to the user)
//   }
// }

async function getCandidates() {
  try {
    console.log("lastcandidateindex_next", contract);

    if (!contract) return;

    const candidatesList = [];
    const lastcandidateindex = parseInt( await contract.lastcandidateindex, 16); // Assuming you have a way to track the total count of candidates
console.log("lastcandidateindex");
    for (let i = 0; i <= lastcandidateindex; i++) {
      const candidate = await contract.getCandidate(i);
      console.log("candidate", candidate)
      if(candidate.name){
        candidatesList.push({
          index: i,
          name: candidate.name,
          // voteCount: candidate.voteCount
        });
      }
    }

    setCandidates(candidatesList);
  } catch (error) {
    console.error('Error while fetching candidates:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

const handleAddCandidate = async (candidate) => {
  try {
    if (!contract || !candidate) return;

    // Call the addCandidate function on the contract
    await contract.addCandidate(candidate);

    // Refresh the candidates list after adding a new candidate
    await getCandidates();

  } catch (error) {
    console.error('Error while adding candidate:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
};

const handleRemoveCandidate = async (index) => {
  try {
    if (!contract) return;

    await contract.removeCandidate(index);


    await getCandidates();
    
  } catch (error) {
    console.error('Error while removing candidate:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
};


async function getWinnerName() {
  try {
    if (!contract) return;

    const winner = Number(await contract.getIndexOfMaxVoteCount());
    const candidate = await contract.getCandidate(winner);
    setWinner(candidate.name);
  } catch (error) {
    console.error('Error while fetching winner name:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

async function startElection(durationInMinutes) {
  try {
    if (!contract) return;

    console.log(electionStartedStatus, "electionStartedStatus********");
    await contract.startElection(durationInMinutes);
    setElectionStartedStatus(true);
    console.log(electionStartedStatus, "electionStartedStatus_______")
    
  } catch (error) {
    console.error(error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}


async function electionStarted() {
  try {
    if (!contract) return;

    const status = await contract.electionStarted();
    setElectionStartedStatus(status);
    // if(!electionStartedStatus) 
    //     {
    //       setvoterID(null);
    //       toast.error('Election not started yet');
    //     }
  } catch (error) {
    console.error('Error while fetching current status:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}
async function getCurrentStatus() {
  try {
    if (!contract) return;

    const status = await contract.getVotingStatus();
    setVotingStatus(status);
  } catch (error) {
    console.error('Error while fetching current status:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

async function getRemainingTime() {
  try {
    if (!contract) return;

    const time = await contract.getRemainingTime();
    setremainingTime(parseInt(time, 16));
  } catch (error) {
    console.error('Error while fetching remaining time:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

const logout = () => {
  setvoterID(null);
};


  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
          <Route path="/admin" element={<Admin startElection={startElection} handleAddCandidate={handleAddCandidate} handleRemoveCandidate={handleRemoveCandidate} getCandidates={getCandidates} candidates = {candidates}/>} />
          <Route path="/register" element={<Registration/>} />
          <Route path="/"
            element={ 
              (voterID !== null) ? 
                  (electionStartedStatus?
              ( votingStatus ?
                    (<Connected 
                    voterID = {voterID}
                    electionStartedStatus ={electionStartedStatus}
                    remainingTime = {remainingTime}
                    logout = {logout}
                    candidates = {candidates}
                    vote = {vote}
                    CanVote = {CanVote}/>)
              :  (<Finished  getWinnerName = {getWinnerName} winner = {winner} verifyVote = {verifyVote} voteData = {voteData} logout = {logout} not_voted = {CanVote}/>))
                    :(<div className='text-white'>election not started, reload the page</div>))
              :
              <PhoneNoLogin setvoterID = {setvoterID}/>
            } />
        </Routes>
      </div>
    </Router>
      
      <Toaster />
    </div>
  );

}

export default App;
