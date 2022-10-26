import { ethers } from "hardhat";
import setupDemo from "./demo/setupDemo";
import setupDeploy from "./demo/setupDeploy";
import setupEmptyDemo from "./demo/setupEmptyDemo";

async function main() {
  const daoId = "demo"
  const projectId = "season1"

  // tokenの発行
  const Token = await ethers.getContractFactory("DAOToken");
  const NAME = "Web3HachathonCoin"
  const SYMBOL = "W3HC"
  const INITIAL_SUPPLY = ethers.utils.parseEther("0");
  const token = await Token.deploy(NAME, SYMBOL, INITIAL_SUPPLY);
  await token.deployed();
  console.log("DAOToken deployed to:", token.address);

  // PollFactoryのデプロイ
  const PollFactory = await ethers.getContractFactory("PollFactory");
  const pollFactory = await PollFactory.deploy();
  await pollFactory.deployed();
  console.log("PollFactory deployed to:", pollFactory.address);

  // DaoHistoryのデプロイ
  const DaoHistory = await ethers.getContractFactory("DAOHistory");
  const daoHistory = await DaoHistory.deploy(pollFactory.address);
  await daoHistory.deployed();
  console.log("DAOHistory deployed to:", daoHistory.address);

  // DAOの追加
  await daoHistory.addDao(daoId, projectId, "Web3 Hackathon DAO", "The Web3 Hackathon DAO is a DAO that was created for the Hackathon and aims to create this product.", "https://englister.yunomy.com", "https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/web3hackathon/icon.jpeg");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
