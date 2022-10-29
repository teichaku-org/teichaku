import { ethers } from "hardhat";
import { getSigner } from "../../frontend/src/hooks/web3/useMetaMask";

const daoId = "web3hackathon";
const projectId = "demo";
const daoHistoryAddress = "0xBfDe11DDAB2c81e72d43872Fe3Ed1e47d54C1A75"
async function main() {
    const daoHistory = await ethers.getContractAt("DAOHistory", daoHistoryAddress);
    const pollAddress = await daoHistory.pollAddress(daoId, projectId);
    const poll = await ethers.getContractAt("Poll", pollAddress);

    await poll.changePerspective([
        "貢献度",
        "難易度",
        "量"
    ])
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
