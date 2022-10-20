pragma solidity ^0.8.9;

struct ContributionItem {
    string contributionText;
    string[] evidences;
    string[] roles;
    address contributor;
    int256 pollId;
}
