import { ethers } from "hardhat";
import setupDemo from "./demo/setupDemo";
import setupDeploy from "./demo/setupDeploy";

async function main() {
    const Poll = await ethers.getContractFactory("Poll");
    const NAME = "Web3HachathonCoin"
    const SYMBOL = "W3HC"
    const poll = await Poll.deploy(NAME, SYMBOL);
    await poll.deployed();
    console.log("Poll deployed to:", poll.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
