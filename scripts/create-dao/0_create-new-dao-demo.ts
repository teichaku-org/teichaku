import { ethers } from "hardhat";


const daoId = "teichaku";
const projectId = "demo";
const daoLauncherAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const daoName = "Teichaku DAO";
const daoDescription = "This is a demo DAO for Teichaku DAO";
const website = ""
const logo = "https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/englister/dao_membership.png"
const contributorReward = ethers.utils.parseEther("7000")
const reviewerReward = ethers.utils.parseEther("3000")
const votingDurattion = 60 * 60 * 24 * 7
console.log({
    daoId,
    projectId,
})
async function main() {
    const daoLauncher = await ethers.getContractAt("DAOLauncher", daoLauncherAddress);


    await daoLauncher.createDao(
        daoId, projectId,
        daoName, daoDescription,
        website, logo,
        tokenAddress,
        contributorReward,
        reviewerReward,
        votingDurattion
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
