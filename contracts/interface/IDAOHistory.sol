import "../struct/dao/DAOHistoryItem.sol";
import "../struct/dao/DAOInfo.sol";
import "../struct/dao/DAOInfo.sol";

interface IDAOHistory {
    function addDao(
        string memory daoId,
        string memory projectId,
        string memory name,
        string memory description,
        string memory website,
        string memory logo
    ) external returns (address);

    function addProject(string memory daoId, string memory projectId)
        external
        returns (address);

    function addDaoHistory(
        string memory daoId,
        string memory projectId,
        DAOHistoryItem memory daoHistoryItem
    ) external;

    function getDaoInfo(string memory daoId)
        external
        view
        returns (DAOInfo memory);

    function getDaoHistory(string memory daoId, string memory projectId)
        external
        view
        returns (DAOHistoryItem[] memory);
}
