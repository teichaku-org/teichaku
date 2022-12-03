import { ethers } from "hardhat";

const pollAddress = "0xEa023DeF9976100B5582a8848c3d3a2608caA09a"
const tokenAddress = "0x7e9cf51d2c9f9ca212657c87fabe4f519f93c6cf"

async function main() {
    const poll = await ethers.getContractAt("Poll", pollAddress);

    // Pollが利用するToken, DaoHistory, 投票のために必要なNFTの設定
    await poll.setTokenAddress(tokenAddress, "0x0000000000000000000000000000000000000000");
    console.log("Poll.setDaoTokenAddress");


    // Perspectiveの設定
    await poll.changePerspective(
        [
            "技術的難易度",
            "DAOへの影響",
            "仕事量"
        ]
    )
    console.log("Poll.changePerspective");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
