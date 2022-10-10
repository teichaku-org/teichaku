import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "ethers";
import { DAOToken, DAONFT, DAOHistory } from "../../typechain-types";
import { DAOHistoryItemStruct } from "../../typechain-types/contracts/DAOHistory";
import createDaoHistory from "./createDaoHistory";

async function setupDemo(token: DAOToken, owner: SignerWithAddress, otherAccount: SignerWithAddress, daonft: DAONFT, otherAccount2: SignerWithAddress, daoHistory: DAOHistory) {
    // Tokenの発行
    await token.mint(owner.address, ethers.utils.parseEther("500"));
    await token.mint(otherAccount.address, ethers.utils.parseEther("500"));

    // Ownerなどに投票権を付与
    await daonft.safeMint(owner.address);
    await daonft.safeMint(otherAccount.address);
    await daonft.safeMint(otherAccount2.address);

    // DaoHistoryの追加
    await createDaoHistory(daoHistory)

    // TODO: 辻褄を合わせるためにpollIdをインクリメントする


    // TODO: 投票に立候補している状態にする
}

export default setupDemo;
