import { ethers } from "hardhat";
import setupDemo from "./demo/setupDemo";
import setupDeploy from "./demo/setupDeploy";
import setupEmptyDemo from "./demo/setupEmptyDemo";

async function main() {
  const daoId = "demo"
  const projectId = "season1"
  const daoName = "Teichaku DAO";
  const daoDescription = "This is a demo DAO for Teichaku DAO";
  const website = ""
  const logo = "https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/englister/dao_membership.png"
  const contributorReward = ethers.utils.parseEther("7000")
  const reviewerReward = ethers.utils.parseEther("3000")
  const votingDurattion = 60 * 60 * 24 * 7

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

  // Walletのデプロイ
  const Wallet = await ethers.getContractFactory("Wallet");
  const wallet = await Wallet.deploy();
  await wallet.deployed();
  console.log("Wallet deployed to:", wallet.address);

  // 手数料の設定
  const commissionRate = 5
  await pollFactory.setCommissionRate(commissionRate);
  await pollFactory.setCommissionAddress(wallet.address);

  // DaoHistoryのデプロイ
  const DaoHistory = await ethers.getContractFactory("DAOHistory");
  const daoHistory = await DaoHistory.deploy(pollFactory.address);
  await daoHistory.deployed();
  console.log("DAOHistory deployed to:", daoHistory.address);

  // DAOLauncherのデプロイ
  const DAOLauncher = await ethers.getContractFactory("DAOLauncher");
  const daoLauncher = await DAOLauncher.deploy(daoHistory.address);
  await daoLauncher.deployed();
  console.log("DAOLauncher deployed to:", daoLauncher.address);

  // DAOの追加
  await daoLauncher.createDao(
    daoId, projectId,
    daoName, daoDescription,
    website, logo,
    token.address,
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
