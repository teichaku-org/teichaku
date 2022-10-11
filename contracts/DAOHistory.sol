pragma solidity ^0.8.9;
import "./struct/DAOHistoryItem.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAOHistory is AccessControl, Ownable {
    mapping(string => mapping(string => DAOHistoryItem[])) histories;
    mapping(string => mapping(string => Assessment[])) assessments;

    // Role to add DAO History
    bytes32 public constant ADD_HISTORY_ROLE = keccak256("ADD_HISTORY_ROLE");

    function setupAddHistoryRole(address contractAddress)
        public
        onlyOwner
        returns (bool)
    {
        _setupRole(ADD_HISTORY_ROLE, contractAddress);
        return true;
    }

    function getDaoHistory(string memory daoId, string memory projectId)
        public
        view
        returns (DAOHistoryItem[] memory)
    {
        return histories[daoId][projectId];
    }

    function addDaoHistory(
        string memory daoId,
        string memory projectId,
        DAOHistoryItem memory daoHistoryItem
    ) public {
        require(
            hasRole(ADD_HISTORY_ROLE, msg.sender),
            "Caller is not a add history role"
        );
        histories[daoId][projectId].push(daoHistoryItem);
    }

    function addAssessment(
        string memory daoId,
        string memory projectId,
        Assessment[] memory _assessments
    ) public {
        require(
            hasRole(ADD_HISTORY_ROLE, msg.sender),
            "Caller is not a add assessment role"
        );
        for (uint256 i = 0; i < _assessments.length; i++) {
            assessments[daoId][projectId].push(_assessments[i]);
        }
    }
}
