interface IPoll {
    function setAssignmentToken(uint256 _contributorToken, uint256 _voterToken)
        external;

    function setTokenAddress(address _tokenAddress, address _nftAddress)
        external;

    function setVotingDuration(int256 pollId, uint256 _votingDuration) external;
}
