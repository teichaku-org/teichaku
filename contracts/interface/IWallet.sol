interface IWallet {
    function registerToken(address token) external;

    function withdrawAll() external;

    function withdraw(address token) external;

    function pause() external;

    function unpause() external;
}
