library Aggregator {
    /**
        example: 
            input: [[1,2,3], [4,5,6], [7,8,9]]
            output: [12, 15, 18]
     */
    function sumArray(uint256[][] memory values)
        internal
        pure
        returns (uint256[] memory)
    {
        uint256[] memory sum = new uint256[](values[0].length);
        for (uint256 i = 0; i < values.length; i++) {
            for (uint256 j = 0; j < values[i].length; j++) {
                sum[j] += values[i][j];
            }
        }
        return sum;
    }
}
