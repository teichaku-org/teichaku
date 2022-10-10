import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "ethers";
import { DAOToken, DAONFT, DAOHistory } from "../../typechain-types";
import { DAOHistoryItemStruct } from "../../typechain-types/contracts/DAOHistory";

async function setupDemo(token: DAOToken, owner: SignerWithAddress, otherAccount: SignerWithAddress, daonft: DAONFT, otherAccount2: SignerWithAddress, daoHistory: DAOHistory) {
    // Tokenの発行
    await token.mint(owner.address, ethers.utils.parseEther("500"));
    await token.mint(otherAccount.address, ethers.utils.parseEther("500"));

    // Ownerなどに投票権を付与
    await daonft.safeMint(owner.address);
    await daonft.safeMint(otherAccount.address);
    await daonft.safeMint(otherAccount2.address);

    // DaoHistoryの追加
    const daoHistoryItem1: DAOHistoryItemStruct = {
        contributionText: "Web3Hachathonの準備",
        reward: ethers.utils.parseEther("100"),
        roles: ["owner", "engineer"],
        timestamp: 1665390549,
        contributor: owner.address,
        pollId: 0,
        score: {
            scores: [3, 4, 2],
            perspectiveId: 1
        }
    };
    await daoHistory.addDaoHistory("demo", 0, daoHistoryItem1);

    const daoHistoryItem2: DAOHistoryItemStruct = {
        contributionText: "フロントエンドの実装",
        reward: ethers.utils.parseEther("50"),
        roles: ["engineer", "designer"],
        timestamp: 1665390549,
        contributor: otherAccount.address,
        pollId: 0,
        score: {
            scores: [2, 2, 3],
            perspectiveId: 1
        }
    };
    await daoHistory.addDaoHistory("demo", 0, daoHistoryItem2);

    const daoHistoryItem3: DAOHistoryItemStruct = {
        contributionText: "DAOについて調査",
        reward: ethers.utils.parseEther("150"),
        roles: [],
        timestamp: 1665390549,
        contributor: otherAccount2.address,
        pollId: 0,
        score: {
            scores: [5, 5, 5],
            perspectiveId: 1
        }
    };
    await daoHistory.addDaoHistory("demo", 0, daoHistoryItem3);

    // TODO: 辻褄を合わせるためにpollIdをインクリメントする


    // TODO: 投票に立候補している状態にする
}

export default setupDemo;
