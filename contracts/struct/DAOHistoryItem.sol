struct Score {
    uint256[] scores;
    uint256 perspectiveId;
}

struct Comment {
    string comment;
    address author;
}

struct Perspectives {
    string[] names;
}

struct DAOHistoryItem {
    string contributionText;
    uint256 reward;
    string[] roles;
    uint256 timestamp;
    address contributor;
    int256 pollId;
    Score score;
}
