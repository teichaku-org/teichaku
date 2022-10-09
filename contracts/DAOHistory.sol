pragma solidity ^0.8.9;
import "./struct/DAOHistoryItem.sol";

contract DAOHistory {
    mapping(string => mapping(uint256 => DAOHistoryItem[])) histories;

    constructor() public {
        string[] memory roles = new string[](1);
        roles[0] = "admin";
        Score memory _score = Score({
            scores: new uint256[](0),
            perspectiveId: 0
        });

        histories["demo"][0].push(
            DAOHistoryItem(
                unicode"① DAOHistoryの解決する課題を整理した\n② 必要な開発工数を見積もった\n③ デモのストーリを検討した。",
                1000000000000,
                roles,
                block.timestamp,
                msg.sender,
                0,
                _score
            )
        );
        histories["demo"][0].push(
            DAOHistoryItem(
                unicode"・スマートコントラクトを開発した",
                32141400001,
                new string[](0),
                block.timestamp,
                msg.sender,
                0,
                _score
            )
        );
    }

    function getDaoHistory(string memory daoId, uint256 projectId)
        public
        view
        returns (DAOHistoryItem[] memory)
    {
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
