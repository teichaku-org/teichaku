pragma solidity ^0.8.9;

struct Assessment {
    address voter;
    address candidate;
    uint256[] points;
    string comment;
    uint256 perspectiveId;
    int256 pollId;
}

struct DAOHistoryItem {
    string contributionText;
    uint256 reward;
    string[] roles;
    uint256 timestamp;
    address contributor;
    int256 pollId;
    //WARN: Assessment[] assessments;を定義できない
}
