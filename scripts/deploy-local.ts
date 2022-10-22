import { ethers } from "hardhat";
import setupDemo from "./demo/setupDemo";
import setupDeploy from "./demo/setupDeploy";
import setupEmptyDemo from "./demo/setupEmptyDemo";

async function main() {
  const {
    owner, otherAccount, otherAccount2,
    token, daoHistory, poll, daonft
  } = await setupDeploy()
  await setupDemo(token, owner, otherAccount, daonft, otherAccount2, daoHistory, poll);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
