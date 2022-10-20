pragma solidity ^0.8.9;

struct AbstractPollItem {
    int256 pollId;
    uint256 votersCount;
    uint256 candidatesCount;
    uint256 startTimeStamp;
}
