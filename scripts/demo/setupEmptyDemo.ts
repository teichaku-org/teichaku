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

    // Tokenを発行しPollに送金
    await token.mint(poll.address, ethers.utils.parseEther("100500"));

    // 投票者と貢献者に配布するトークンの量を決定する
    await poll.setAssignmentToken(ethers.utils.parseEther("7000"), ethers.utils.parseEther("3000"))

}

export default setupEmptyDemo;
