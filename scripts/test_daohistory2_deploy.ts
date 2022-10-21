import { ethers } from "hardhat";
import setupDemo from "./demo/setupDemo";
import setupDeploy from "./demo/setupDeploy";

async function main() {
    const DaoHistory = await ethers.getContractFactory("DAOHistory2");
    const daoHistory = await DaoHistory.deploy();
    await daoHistory.deployed();
    console.log("DAOHistory deployed to:", daoHistory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
