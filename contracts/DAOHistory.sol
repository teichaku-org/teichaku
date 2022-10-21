pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Poll.sol";
import "./struct/dao/DAOInfo.sol";
import "./struct/dao/DAOHistoryItem.sol";
import "./struct/assessment/Assessment.sol";

// dev
import "hardhat/console.sol";

contract DAOHistory is AccessControl, Ownable {
    // daoId => projectId => [DAOHistoryItem, ...]
    mapping(string => mapping(string => DAOHistoryItem[])) public histories;

    // daoId => projectId => [Assessment, ...]
    mapping(string => mapping(string => Assessment[])) public assessments;

    // daoId => projectId => [Poll, ...]
    mapping(string => mapping(string => address)) public pollAddress;

    // daoId => [DAOInfo, ...]
    mapping(string => DAOInfo) public daoInfo;

    // Role to interact with DAO History
    bytes32 public constant ADD_HISTORY_ROLE = keccak256("ADD_HISTORY_ROLE");

    /**
     * @notice Setup role for other contract to interact with DAO History
     * @dev only owner can set DAO History Address
     */
    function setupAddHistoryRole(address contractAddress)
        public
        onlyOwner
        returns (bool)
    {
        _setupRole(ADD_HISTORY_ROLE, contractAddress);
        return true;
    }

    /**
     * @notice Add DAO and create a poll contract
     */
    function addDao(
        string memory daoId,
        string memory projectId,
        string memory name,
        string memory description,
        string memory website,
        string memory logo
    ) public returns (address) {
        require(
            daoInfo[daoId].projects.length == 0,
            "DAOHistory: DAO already exists"
        );
        string[] memory projects = new string[](1);
        projects[0] = projectId;
        daoInfo[daoId] = DAOInfo(name, description, website, logo, projects);

        // add initial project
        address _pollAddress = addProject(daoId, projectId);
        return _pollAddress;
    }

    /**
     * @notice Add Project and create a poll contract
     */
    function addProject(string memory daoId, string memory projectId)
        public
        returns (address)
    {
        require(
            daoInfo[daoId].projects.length != 0,
            "DAOHistory: DAO does not exist"
        );
        require(
            pollAddress[daoId][projectId] == address(0),
            "DAOHistory: Project already exists"
        );
        // Create a poll contract
        Poll poll = new Poll(daoId, projectId);
        setupAddHistoryRole(address(poll));
        pollAddress[daoId][projectId] = address(poll);
        poll.setDaoHistoryAddress(address(this));

        // grant permission
        poll.setPollAdminRole(msg.sender);
        poll.transferOwnership(msg.sender);

        return address(poll);
    }

    function addDaoHistory(
        string memory daoId,
        string memory projectId,
        DAOHistoryItem memory daoHistoryItem
    ) public {
        require(
            hasRole(ADD_HISTORY_ROLE, msg.sender),
            "Caller has no permission to add history"
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
            "Caller has no permission to add assessment"
        );
        for (uint256 i = 0; i < _assessments.length; i++) {
            assessments[daoId][projectId].push(_assessments[i]);
        }
    }

    function getDaoInfo(string memory daoId)
        public
        view
        returns (DAOInfo memory)
    {
        return daoInfo[daoId];
    }

    function getDaoHistory(string memory daoId, string memory projectId)
        public
        view
        returns (DAOHistoryItem[] memory)
    {
        return histories[daoId][projectId];
    }

    function getDaoAssessments(string memory daoId, string memory projectId)
        public
        view
        returns (Assessment[] memory)
    {
        return assessments[daoId][projectId];
    }
}
