import { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import PhoneNoLogin from './Components/PhoneNoLogin.jsx';
import Finished from './Components/Finished';
import Connected from './Components/Connected';
import './App.css';

function App() {

  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [CanVote, setCanVote] = useState(true);
  const [voterID, setvoterID] = useState(null);;
  const [contract, setContract] = useState(null);
  const CONTRACT_ADDRESS ="0x7D6A5697f8846855a39f488E08d77055bED3cD87"
  const PRIVATE_KEY = "b3409f6f45ef522faf29c052914d13511ac5c6515aea2d138c6b9d70341815cf"
  const API_URL = "https://volta-rpc.energyweb.org"
  const SimpleStorageABI = [
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "_candidateNames",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "_durationInMinutes",
          "type": "uint256"
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
      "name": "getAllVotesOfCandiates",
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
          "internalType": "struct Voting.Candidate[]",
          "name": "",
          "type": "tuple[]"
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
// console.log("**************");
  const provider = new ethers.JsonRpcProvider(API_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider); // Replace with the private key of your specified address
  
    setContract(new ethers.Contract(CONTRACT_ADDRESS, SimpleStorageABI, signer));

    getCandidates();

    // while(!contract);
  }, []);

  useEffect(() => {
    
        getCandidates();
    
        // while(!contract);
      }, [voterID]);
      
  useEffect( () => {
    
    // console.log(votingStatus, "$$$$$$$$$voting status");
    // console.log(contract, "$$$$$$$$$contract");
    getRemainingTime();
    getCurrentStatus();
    // verifyVote();
  });

  useEffect( () => {
    // console.log("***&&&&&&&&&&&&&&&&***");

    canVote();
  }, [voterID]);

async function vote(candidateNumber) {
  try {
    if (!contract) return;

    console.log(voterID, candidateNumber);
    const tx = await contract.vote(voterID, parseInt(candidateNumber, 10));

    await tx.wait();
    console.log("voting successful");

    await canVote();
  } catch (error) {
    console.error('Error while voting:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

async function canVote() {
  try {
    if (!contract) return;

    const voteStatus = await contract.hasVoted(voterID);
    console.log("voting done:", voteStatus);
    setCanVote(!voteStatus);
  } catch (error) {
    console.error('Error while checking voting status:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

async function verifyVote() {
  try {
    if (!contract) return;

    const [vote, voteIndex] = await contract.VerifyVote(voterID);
    const numberA = Number(vote);
    const numberB = Number(voteIndex);
    console.log(numberA, numberB, "#######");
    return [numberA, numberB];
  } catch (error) {
    console.error('Error while verifying vote:', error);
    // Handle error gracefully (e.g., show an error message to the user)
    return null;
  }
}

async function getCandidates() {
  try {
    if (!contract) return;

    const candidatesList = await contract.getAllVotesOfCandiates();
    const formattedCandidates = candidatesList.map((candidate, index) => ({
      index: index,
      name: candidate.name,
      // voteCount: candidate.voteCount.toNumber()
    }));
    setCandidates(formattedCandidates);
  } catch (error) {
    console.error('Error while fetching candidates:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

async function getWinnerName() {
  try {
    if (!contract) return;

    const winner = Number(await contract.getIndexOfMaxVoteCount());
    return winner;
  } catch (error) {
    console.error('Error while fetching winner name:', error);
    // Handle error gracefully (e.g., show an error message to the user)
    return null;
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
      { 
        (voterID !== null) ? 
        ( votingStatus ?
            (<Connected 
              voterID = {voterID}
              remainingTime = {remainingTime}
              logout = {logout}
              candidates = {candidates}
              vote = {vote}
              CanVote = {CanVote}/>) 
        :  (<Finished  getWinnerName = {getWinnerName} verifyVote = {verifyVote} logout = {logout} not_voted = {CanVote}/>))
        :
        <PhoneNoLogin setvoterID = {setvoterID}/>
      }
      
    </div>
  );

}

export default App;
