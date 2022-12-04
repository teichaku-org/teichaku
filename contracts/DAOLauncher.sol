pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interface/IDAOHistory.sol";
import "./interface/IPoll.sol";

contract DAOLauncher is AccessControl, Ownable {
    address daoHistoryAddress;

    constructor(address _daoHistoryAddress) {
        daoHistoryAddress = _daoHistoryAddress;
    }

    /**
     * @notice Add DAO and create a poll contract
     */
    function createDao(
        string memory daoId,
        string memory projectId,
        string memory name,
        string memory description,
        string memory website,
        string memory logo,
        address _tokenAddress,
        uint256 _contributorToken,
        uint256 _voterToken,
        uint256 _votingDuration
    ) external returns (address) {
        IDAOHistory daoHistory = IDAOHistory(daoHistoryAddress);
        address pollAddress = daoHistory.addDao(
            daoId,
            projectId,
            name,
            description,
            website,
            logo
        );
        IPoll poll = IPoll(pollAddress);
        poll.setAssignmentToken(_contributorToken, _voterToken);
        poll.setTokenAddress(_tokenAddress, address(0));
        poll.setVotingDuration(0, _votingDuration);
        poll.settleCurrentPollAndCreateNewPoll();
    }
}
