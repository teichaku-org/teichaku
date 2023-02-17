import { ethers } from "hardhat";

const daoId = "hackathon";
const projectId = "demo";
const daoHistoryAddress = "0xBfDe11DDAB2c81e72d43872Fe3Ed1e47d54C1A75"
async function main() {
    const daoHistory = await ethers.getContractAt("DAOHistory", daoHistoryAddress);
    const pollAddress = await daoHistory.pollAddress(daoId, projectId);
    const poll = await ethers.getContractAt("Poll", pollAddress);
    const currentPollId = await poll.currentMaxPollId();
    console.log("currentPollId", currentPollId.toString());
    await poll.setVotingDuration(currentPollId, 60 * 60 * 24 * 14)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
