import { ethers } from "hardhat";
import setupDemo from "./demo/setupDemo";
import setupDeploy from "./demo/setupDeploy";
import setupEmptyDemo from "./demo/setupEmptyDemo";

const daoHistoryAddress = "0x9E22909C9862EEF94A0D830461103335A634202c"
const tokenAddress = "0x7BE92ae8449ecFB012D05d72BedE9728d9D033Bc"

async function main() {
  const daoId = "demo"
  const projectId = "season1"

  const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

  const daoHistory = await ethers.getContractAt("DAOHistory", daoHistoryAddress);
  const token = await ethers.getContractAt("DAOToken", tokenAddress);

  const pollAddress = await daoHistory.pollAddress(daoId, projectId);
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
