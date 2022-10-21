import { ethers } from "hardhat";
import { getSigner } from "../frontend/src/hooks/web3/useMetaMask";
import setupDemo from "./demo/setupDemo";
import setupDeploy from "./demo/setupDeploy";
import setupEmptyDemo from "./demo/setupEmptyDemo";

async function main() {
    const [owner, otherAccount, otherAccount2] = await ethers.getSigners();
    const token = await ethers.getContractAt("DAOToken", "0x296765fAA585C18b1d66204EEf5cdE899Eb6B523");
    const daoHistory = await ethers.getContractAt("DAOHistory", "0x1e453D8255C829334317A3aF8C11D069641D44EC");
    const poll = await ethers.getContractAt("Poll", "0xDcdCcc9b6bDd061c6E89133933d8699E3d13D8E1");
    const daonft = await ethers.getContractAt("DAONFT", "0x38C5218D54B3Bb8836713A77610C3eD2C1fc0ec2");

    await setupDemo(token, owner, otherAccount, daonft, otherAccount2, daoHistory, poll);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
