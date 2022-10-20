pragma solidity ^0.8.9;

struct Assessment {
    address voter;
    address contributor;
    uint256[] points;
    string comment;
    uint256 perspectiveId;
    int256 pollId;
}
