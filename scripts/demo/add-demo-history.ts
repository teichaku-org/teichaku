import { ethers } from "hardhat";
import setupDemo from "./setupDemo";
import setupDeploy from "./setupDeploy";
import setupEmptyDemo from "./setupEmptyDemo";

async function main() {
  const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

  const daoHistory = await ethers.getContractAt("DAOHistory", "0x1e453D8255C829334317A3aF8C11D069641D44EC");
  const token = await ethers.getContractAt("DAOToken", "0x296765fAA585C18b1d66204EEf5cdE899Eb6B523");

  const pollAddress = await daoHistory.pollAddress("demo", "season1");
  const poll = await ethers.getContractAt("Poll", pollAddress);
  console.log("Poll deployed to:", poll.address);


  // DAONFTのデプロイ
  const DAONFT = await ethers.getContractFactory("DAONFT");
  const DAONFT_NAME = "DAO Membership NFT For Poll"
  const DAONFT_SYMBOL = "DAONFT"
  const daonft = await DAONFT.deploy(DAONFT_NAME, DAONFT_SYMBOL);
  await daonft.deployed();
  console.log("DAONFT deployed to:", daonft.address);


  // Pollが利用するToken, DaoHistory, 投票のために必要なNFTの設定
  await poll.setTokenAddress(token.address, "0x0000000000000000000000000000000000000000");
  console.log("Poll.setDaoTokenAddress");


  // Perspectiveの設定
  await poll.changePerspective(
    [
      "技術的難易度",
      "DAOへの影響",
      "仕事量"
    ]
  )
  console.log("Poll.changePerspective");

  await setupEmptyDemo(token, owner, otherAccount, daonft, otherAccount2, daoHistory, poll);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
