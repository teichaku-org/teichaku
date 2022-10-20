pragma solidity ^0.8.9;
import "./ContributionItem.sol";

struct DetailPollItem {
    int256 pollId;
    ContributionItem[] contributions;
    address[] voters;
    uint256 startTimeStamp;
    uint256 endTimeStamp;
    string[] perspectives;
}
