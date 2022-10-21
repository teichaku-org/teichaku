import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "ethers";
import { DAOToken, DAONFT, DAOHistory, Poll } from "../../typechain-types";
import { DAOHistoryItemStruct } from "../../typechain-types/contracts/DAOHistory";
import createAssessment from "./createAssessment";
import createDaoHistory from "./createDaoHistory";

async function setupEmptyDemo(
    token: DAOToken,
    owner: SignerWithAddress,
    otherAccount: SignerWithAddress,
    daonft: DAONFT,
    otherAccount2: SignerWithAddress,
    daoHistory: DAOHistory,
    poll: Poll) {

    // Tokenの発行
    await token.mint(owner.address, ethers.utils.parseEther("100500"));

    // Pollに送金する
    await token.transfer(poll.address, ethers.utils.parseEther("100000"));

    // 投票者と貢献者に配布するトークンの量を決定する
    await poll.setAssignmentToken(ethers.utils.parseEther("7000"), ethers.utils.parseEther("3000"))

}

export default setupEmptyDemo;
