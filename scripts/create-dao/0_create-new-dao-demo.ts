import { ethers } from "hardhat";


const daoId = "hackathon";
const projectId = "demo";
const daoHistoryAddress = "0xBfDe11DDAB2c81e72d43872Fe3Ed1e47d54C1A75"

async function main() {
    const daoHistory = await ethers.getContractAt("DAOHistory", daoHistoryAddress);

    const daoName = "Web3Hackathon DAO";
    const daoDescription = "This is a demo DAO for Web3Hackathon";
    const website = ""
    const logo = "https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/web3hackathon/icon.jpeg"

    await daoHistory.addDao(daoId, projectId, daoName, daoDescription, website, logo);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
