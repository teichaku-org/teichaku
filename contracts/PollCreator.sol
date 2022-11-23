pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Poll.sol";
import "./struct/dao/DAOInfo.sol";
import "./struct/dao/DAOHistoryItem.sol";
import "./struct/assessment/Assessment.sol";

contract PollFactory is AccessControl, Ownable {
    uint256 COMMISSION_RATE = 5;
    address COMMISSION_ADDRESS;

    function createPoll(
        string memory daoId,
        string memory projectId,
        address sender
    ) public returns (address) {
        require(
            COMMISSION_ADDRESS != address(0),
            "commission address is not set"
        );
        // Create a poll contract
        Poll poll = new Poll(
            daoId,
            projectId,
            COMMISSION_RATE,
            COMMISSION_ADDRESS
        );
        address pollAddress = address(poll);
        require(pollAddress != address(0), "Poll address is invalid");
        poll.setDaoHistoryAddress(msg.sender);

        // grant permission
        poll.setPollAdminRole(sender);
        poll.transferOwnership(sender);
        return pollAddress;
    }

    function setCommissionRate(uint256 rate) public onlyOwner {
        COMMISSION_RATE = rate;
    }

    function setCommissionAddress(address addr) public onlyOwner {
        COMMISSION_ADDRESS = addr;
    }
}
