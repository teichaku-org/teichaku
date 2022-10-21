pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Poll.sol";
import "./struct/dao/DAOInfo.sol";
import "./struct/dao/DAOHistoryItem.sol";
import "./struct/assessment/Assessment.sol";

contract PollCreator is AccessControl, Ownable {
    function createPoll(
        string memory daoId,
        string memory projectId,
        address sender
    ) public returns (address) {
        // Create a poll contract
        Poll poll = new Poll(daoId, projectId);
        poll.setDaoHistoryAddress(msg.sender);

        // grant permission
        poll.setPollAdminRole(sender);
        poll.transferOwnership(sender);
        return address(poll);
    }
}
