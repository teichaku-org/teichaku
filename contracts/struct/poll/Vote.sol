pragma solidity ^0.8.9;
struct Vote {
    address voter;
    address[] candidates;
    uint256[][] points;
    string[] comments;
    uint256 perspectiveId;
}
