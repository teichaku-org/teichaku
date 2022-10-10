// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DAOToken.sol";
import "./HistoryNFT.sol";
import "./DAOHistory.sol";

contract HistoryNFTCreator is Ownable {
    mapping(address => bool) whitelist;
    address private _daoNftAddress;
    address private _daoHistoryAddress;

    constructor() {}

    /**
     * @notice Set DAO NFT Address.
     */
    function setDAONftAddress(address _address) external onlyOwner {
        _daoNftAddress = _address;
    }

    /**
     * @notice Set DAO History Address.
     */
    function setDAOHistoryAddress(address _address) external onlyOwner {
        _daoHistoryAddress = _address;
    }

    /**
     * @notice Create NFT based on the sprint info.
     */
    function mintForSprint(
        string memory daoId,
        uint256 projectId,
        int256 pollId
    ) public {
        //DAO Historyからデータを取得する
        DAOHistory daoHistory = DAOHistory(_daoHistoryAddress);
        DAOHistoryItem[] memory daoHistoryItems = daoHistory.getDaoHistory(
            daoId,
            projectId
        );
        //対象となるデータを取得する
        for (uint256 i = 0; i < daoHistoryItems.length; i++) {
            if (
                daoHistoryItems[i].pollId == pollId &&
                daoHistoryItems[i].contributor == msg.sender
            ) {
                //NFTを発行する
                DAOHistoryItem memory item = daoHistoryItems[i];
                //TODO: Historyの情報を付与してNFTを発行する(metaデータに付与するなら不要？)
                HistoryNFT dAONFT = HistoryNFT(_daoNftAddress);
                dAONFT.safeMint(msg.sender);
            }
        }
    }

    /**
     * @notice Create NFT based on whole period.
     */
    function mintForWholePeriod(string memory daoId, uint256 projectId) public {
        //DAO Historyからデータを取得する
        DAOHistory daoHistory = DAOHistory(_daoHistoryAddress);
        DAOHistoryItem[] memory daoHistoryItems = daoHistory.getDaoHistory(
            daoId,
            projectId
        );
        //対象となるデータを取得する
        for (uint256 i = 0; i < daoHistoryItems.length; i++) {
            if (daoHistoryItems[i].contributor == msg.sender) {
                //ターゲットとなるデータの集合
            }
        }
    }
}
