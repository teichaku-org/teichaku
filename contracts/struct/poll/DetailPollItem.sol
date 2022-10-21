pragma solidity ^0.8.9;

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
    uint256 endTimeStamp;
    string[] perspectives;
}
