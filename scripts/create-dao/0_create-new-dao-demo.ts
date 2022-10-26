import { ethers } from "hardhat";


const daoId = "mydao";
const projectId = "myproject";
const daoHistoryAddress = "0x1e453D8255C829334317A3aF8C11D069641D44EC"

async function main() {
    const daoHistory = await ethers.getContractAt("DAOHistory", daoHistoryAddress);

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
