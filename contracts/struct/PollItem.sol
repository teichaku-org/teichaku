pragma solidity ^0.8.9;

struct AbstractPollItem {
    int256 pollId;
    uint256 votersCount;
    uint256 candidatesCount;
    uint256 startTimeStamp;
}

struct ContributionItem {
    string contributionText;
    string[] evidences;
    string[] roles;
    address contributor;
    int256 pollId;
}

struct DetailPollItem {
    int256 pollId;
    ContributionItem[] contributions;
    address[] voters;
    uint256 startTimeStamp;
    string[] perspectives;
}

struct Perspectives {
    string[] names;
}
