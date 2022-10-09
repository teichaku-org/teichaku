pragma solidity ^0.8.9;
import "./struct/DAOHistoryItem.sol";

contract DAOHistory {
    mapping(string => mapping(uint256 => DAOHistoryItem[])) histories;

    constructor() public {
        string[] memory roles = new string[](1);
        roles[0] = "admin";

        histories["demo"][0].push(
            DAOHistoryItem(
                unicode"① 問題を解いたときに出てくる英語年齢が高めに出るように設定してシェアされやすくした\n② 問題文を英語表示できるようにすることで、ユーザが英語で考えやすくした\n③ 問題文を英語表示できるようにすることで、ユーザが英語で考えやすくした",
                1000000000000,
                roles,
                block.timestamp,
                msg.sender
            )
        );
        histories["demo"][0].push(
            DAOHistoryItem(
                unicode"・質問文を349個追加しました：主にBasic/ディベート/MBA質問集。",
                3214141,
                new string[](0),
                block.timestamp,
                msg.sender
            )
        );
    }

    function getDaoHistory(string memory daoId, uint256 projectId)
        public
        view
        returns (DAOHistoryItem[] memory)
    {
        //TODO: implement
        return histories[daoId][projectId];
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
