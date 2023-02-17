import { ethers } from "hardhat";

const daoId = "hackathon";
const projectId = "demo";
const daoHistoryAddress = "0xBfDe11DDAB2c81e72d43872Fe3Ed1e47d54C1A75"
const tokenAddress = "0xeCC7Bb4cf28Dc6fe99A9f0Fb0AdFD5a2E0F7707A"
const contributorReward = ethers.utils.parseEther("7000");
const voterReward = ethers.utils.parseEther("3000");
async function main() {
    const [owner] = await ethers.getSigners();
    const token = await ethers.getContractAt("DAOToken", tokenAddress);
    const daoHistory = await ethers.getContractAt("DAOHistory", daoHistoryAddress);
    const pollAddress = await daoHistory.pollAddress(daoId, projectId);
    const poll = await ethers.getContractAt("Poll", pollAddress);

    // pollに100000トークンをmint
    await poll.setAssignmentToken(contributorReward, voterReward);
    console.log("setAssignmentToken");
    await token.mint(owner.address, ethers.utils.parseEther("100000"));
    console.log("mint1");
    await token.mint(poll.address, ethers.utils.parseEther("100000"));
    console.log("mint2");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
