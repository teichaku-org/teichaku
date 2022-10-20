pragma solidity ^0.8.9;

struct DAOHistoryItem {
    string contributionText;
    uint256 reward;
    string[] roles;
    uint256 timestamp;
    address contributor;
    int256 pollId;
    string[] evidences;
    //WARN: Assessment[] assessments;を定義できない
}
