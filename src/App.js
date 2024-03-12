import { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import PhoneNoLogin from './Components/PhoneNoLogin.jsx';
import Finished from './Components/Finished';
import Connected from './Components/Connected';
import './App.css';

function App() {
  // const [provider, setProvider] = useState(null);
  // const [account, setAccount] = useState(null);
  // const [isConnected, setIsConnected] = useState(false);
  // const [votersvote, setvotersvote] = useState(null);
  // const [votersvoteindex, setvotersvoteindex] = useState(null);
  // // const [itemList, setItemList] = useState(["0xa3Aa429d5A5944B4C3ABd50b5B0505a53797f5C8"]);
  // const [candidateNumber, setCandidateNumber] = useState(0);  

  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [CanVote, setCanVote] = useState(true);
  // const [winnerName, setwinnerName] = useState(null);
  const [voterID, setvoterID] = useState(null);;
  const [contract, setContract] = useState(null);
  
  useEffect(() => {

  const provider = new ethers.JsonRpcProvider("https://volta-rpc.energyweb.org");
  const contractAddress = "0x7D6A5697f8846855a39f488E08d77055bED3cD87"; // Replace with the deployed contract address
  const signer = new ethers.Wallet("b3409f6f45ef522faf29c052914d13511ac5c6515aea2d138c6b9d70341815cf", provider); // Replace with the private key of your specified address
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
    setContract(new ethers.Contract(contractAddress, SimpleStorageABI, signer));
  }, []);

  useEffect( () => {
    console.log(votingStatus, "$$$$$$$$$voting status");
    // console.log(voterID, "$$$$$$$$$contract");
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    // verifyVote();
  });
  useEffect( () => {
    canVote();
  }, [voterID]);

  async function vote(candidateNumber) {
    console.log(voterID, candidateNumber);
    const tx = await contract.vote(voterID, parseInt(candidateNumber, 10));

    await tx.wait();
    console.log("voting successful");

    canVote();
  }


  async function canVote() {

    const voteStatus = await contract.hasVoted(voterID);
    console.log("voting done:", voteStatus);
    setCanVote(!voteStatus);
  }

  async function verifyVote() {

    const [vote, voteIndex] = await contract.VerifyVote(voterID);
    const numberA = Number(vote);
    const numberB = Number(voteIndex);
    console.log(numberA, numberB, "#######");
    return [numberA, numberB];
}

  async function getCandidates() {
      const candidatesList = await contract.getAllVotesOfCandiates();
      const formattedCandidates = candidatesList.map((candidate, index) => {
        return {
          index: index,
          name: candidate.name,
          // voteCount: candidate.voteCount.toNumber()
        }
      });
      setCandidates(formattedCandidates);
  }

  async function getWinnerName() {

    const winner = Number(await contract.getIndexOfMaxVoteCount());


    return winner;
    
  }

  async function getCurrentStatus() {
      const status = await contract.getVotingStatus();
      setVotingStatus(status);
  }

  async function getRemainingTime() {
      const time = await contract.getRemainingTime();
      setremainingTime(parseInt(time, 16));
  }

  const logout = () => {
    setvoterID(null);
    window.location.reload();

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
        :  (<Finished  getWinnerName = {getWinnerName} verifyVote = {verifyVote} logout = {logout}/>))
        :
        <PhoneNoLogin setvoterID = {setvoterID}/>
      }
      
    </div>
  );

}

export default App;
