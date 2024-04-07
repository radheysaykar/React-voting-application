// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }
    
    struct Voter {
        bool voted;
        uint256 vote;
        uint256 voteIndex;
    }

    mapping(uint256 => Candidate) public candidates;
    
    uint256 public lastcandidateindex;

    address owner;
    
    mapping(string => Voter) IDtoVoter;

    bool electionStartedFlag;

    uint256 public votingStart;
    uint256 public votingEnd;

    constructor(string[] memory _candidateNames) {
        uint256 i = 0;
        for (; i < _candidateNames.length; i++) {
            candidates[i] = Candidate({
                name: _candidateNames[i],
                voteCount: 0
            });
            
        }
        lastcandidateindex = i - 1;

        owner = msg.sender;

        electionStartedFlag = false;
    }



    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    


    function startElection(uint256 _durationInMinutes) public {
        require(electionStartedFlag == false, "Election already started");
        electionStartedFlag = true;

        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }    

    function addCandidate(string memory _name) public onlyOwner {
        require(electionStartedFlag == false, "Election started");

        candidates[lastcandidateindex + 1] = (Candidate({
                name: _name,
                voteCount: 0
        }));

        lastcandidateindex++;
    }

    function removeCandidate(uint256 index) public onlyOwner {
        require(electionStartedFlag == false, "Election started");
        require(lastcandidateindex >= index, "Invalid index");
        
        delete candidates[index];
    }

    function vote(string memory voterID, uint256 _candidateIndex) public {
        require(!IDtoVoter[voterID].voted, "You have already voted.");
        require(_candidateIndex <= lastcandidateindex, "Invalid candidate index.");
        require(block.timestamp >= votingStart);
        require(block.timestamp < votingEnd);
        require(electionStartedFlag == true, "Election not started");
        

        candidates[_candidateIndex].voteCount++;
        IDtoVoter[voterID].voted = true;
        IDtoVoter[voterID].vote = _candidateIndex;
        IDtoVoter[voterID].voteIndex = candidates[_candidateIndex].voteCount;
    }

    function VerifyVote(string memory voterID) public view returns (uint256, uint256) {
        return (IDtoVoter[voterID].vote, IDtoVoter[voterID].voteIndex);
    }

    function hasVoted(string memory voterID) public view returns (bool) {
        return (IDtoVoter[voterID].voted);
    } 

    function electionStarted() public view returns (bool) {
        return electionStartedFlag;
    } 

    function getCandidate(uint256 _candidateIndex) public view returns (Candidate memory){
        return candidates[_candidateIndex];
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    function getRemainingTime() public view returns (uint256) {

        if (block.timestamp >= votingEnd) {
            return 0;
        }
        return votingEnd - block.timestamp;
    }
    function getIndexOfMaxVoteCount() public view returns (uint256) {
        require(lastcandidateindex >= 0, "No candidates available.");

        uint256 maxVoteCount = 0;
        uint256 indexOfMaxVoteCount = 0;

        for (uint256 i = 0; i <= lastcandidateindex; i++) {
            if (candidates[i].voteCount > maxVoteCount) {
                maxVoteCount = candidates[i].voteCount;
                indexOfMaxVoteCount = i;
            }
        }

        return indexOfMaxVoteCount;
    }
}
