import { ethers } from "hardhat";

const daoId = "test";
const projectId = "test";
const daoHistoryAddress = "0xBfDe11DDAB2c81e72d43872Fe3Ed1e47d54C1A75"
async function main() {
    const daoHistory = await ethers.getContractAt("DAOHistory", daoHistoryAddress);

    const pollAddress = await daoHistory.pollAddress(daoId, projectId);
    console.log("pollAddress", pollAddress);
    const poll = await ethers.getContractAt("Poll", pollAddress);

    // tokenの発行
    const Token = await ethers.getContractFactory("DAOToken");
    const NAME = "Test Token"
    const SYMBOL = "TEST"
    const INITIAL_SUPPLY = ethers.utils.parseEther("100000");
    const token = await Token.deploy(NAME, SYMBOL, INITIAL_SUPPLY);
    await token.deployed();
    console.log("DAOToken deployed to:", token.address);

    await poll.setTokenAddress(token.address, "0x0000000000000000000000000000000000000000");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
