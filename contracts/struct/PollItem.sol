struct AbstractPollItem {
    int256 pollId;
    uint256 votersCount;
    uint256 candidatesCount;
    uint256 startTimeStamp;
}

struct ContributionItem {
    string contributionText;
    string[] evidence;
    string[] roles;
    address contributor;
    uint256 pollId;
}

struct DetailPollItem {
    int256 pollId;
    ContributionItem[] contributions;
    address[] voters;
    uint256 startTimeStamp;
}
