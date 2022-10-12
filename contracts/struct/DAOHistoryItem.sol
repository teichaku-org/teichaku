pragma solidity ^0.8.9;

struct DAOInfo {
    string name;
    string description;
    string website;
    string logo;
    string[] projects;
}

struct Assessment {
    address voter;
    address contributor;
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
