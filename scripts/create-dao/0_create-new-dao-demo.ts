import { ethers } from "hardhat";
import { getSigner } from "../../frontend/src/hooks/web3/useMetaMask";
import setupDemo from "../demo/setupDemo";
import setupDeploy from "../demo/setupDeploy";
import setupEmptyDemo from "../demo/setupEmptyDemo";

async function main() {
    const [owner, otherAccount, otherAccount2] = await ethers.getSigners();
    const daoHistory = await ethers.getContractAt("DAOHistory", "0x1e453D8255C829334317A3aF8C11D069641D44EC");

    const daoId = "mydao";
    const projectId = "myproject";
    const daoName = "My DAO";
    const daoDescription = "My DAO description";
    const website = ""
    const logo = ""

    await daoHistory.addDao(daoId, projectId, daoName, daoDescription, website, logo);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
