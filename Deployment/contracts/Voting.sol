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

    Candidate[] public candidates;

    address owner;
    
    mapping(string => Voter) IDtoVoter;

    uint256 public votingStart;
    uint256 public votingEnd;

constructor(string[] memory _candidateNames, uint256 _durationInMinutes) {
    for (uint256 i = 0; i < _candidateNames.length; i++) {
        candidates.push(Candidate({
            name: _candidateNames[i],
            voteCount: 0
        }));
    }
    owner = msg.sender;
    votingStart = block.timestamp;
    votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
}

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate({
                name: _name,
                voteCount: 0
        }));
    }

    function vote(string memory voterID, uint256 _candidateIndex) public {
        require(!IDtoVoter[voterID].voted, "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");

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

    function getAllVotesOfCandiates() public view returns (Candidate[] memory){
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= votingStart, "Voting has not started yet.");
        if (block.timestamp >= votingEnd) {
            return 0;
    }
        return votingEnd - block.timestamp;
    }
    function getIndexOfMaxVoteCount() public view returns (uint256) {
        require(candidates.length > 0, "No candidates available.");

        uint256 maxVoteCount = 0;
        uint256 indexOfMaxVoteCount = 0;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maxVoteCount) {
                maxVoteCount = candidates[i].voteCount;
                indexOfMaxVoteCount = i;
            }
        }

        return indexOfMaxVoteCount;
    }
}
