pragma solidity ^0.8.9;
import "./struct/DAOHistoryItem.sol";

contract DAOHistory {
    function getDaoHistory(string memory daoId, uint256 projectId)
        public
        pure
        returns (DAOHistoryItem[] memory)
    {
        //TODO: implement
        DAOHistoryItem[] memory daoHistory = new DAOHistoryItem[](0);
        return daoHistory;
    }

    function getPersonalPollResult(
        string memory daoId,
        uint256 projectId,
        uint256 pollId,
        address contributor
    ) public returns (DAOHistoryItem memory) {
        //TODO: implement
        DAOHistoryItem memory daoHistoryItem;
        return daoHistoryItem;
    }

    function getAllPollResults(
        string memory daoId,
        uint256 projectId,
        uint256 pollId
    ) public pure returns (DAOHistoryItem[] memory) {
        //TODO: implement
        DAOHistoryItem[] memory daoHistory = new DAOHistoryItem[](0);
        return daoHistory;
    }

    function getPersonalAllResults(
        string memory daoId,
        uint256 projectId,
        address contributor
    ) public pure returns (DAOHistoryItem[] memory) {
        //TODO: implement
        DAOHistoryItem[] memory daoHistory = new DAOHistoryItem[](0);
        return daoHistory;
    }
}
