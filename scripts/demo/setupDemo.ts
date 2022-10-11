import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "ethers";
import { DAOToken, DAONFT, DAOHistory, Poll } from "../../typechain-types";
import { DAOHistoryItemStruct } from "../../typechain-types/contracts/DAOHistory";
import createDaoHistory from "./createDaoHistory";

async function setupDemo(
    token: DAOToken,
    owner: SignerWithAddress,
    otherAccount: SignerWithAddress,
    daonft: DAONFT,
    otherAccount2: SignerWithAddress,
    daoHistory: DAOHistory,
    poll: Poll) {
    // Tokenの発行
    await token.mint(owner.address, ethers.utils.parseEther("500"));
    await token.mint(otherAccount.address, ethers.utils.parseEther("500"));

    // Ownerなどに投票権を付与
    await daonft.safeMint(owner.address);
    await daonft.safeMint(otherAccount.address);
    await daonft.safeMint(otherAccount2.address);

    // DaoHistoryの追加
    await createDaoHistory(daoHistory)

    // 辻褄を合わせるためにpollIdが6になるまでインクリメントする
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()


    // 投票に立候補している状態にする
    await poll.connect(otherAccount).candidateToContributionPoll("① DAO Historyを生み出すまでの議論のファシリテートを行いました。\n② DAO Historyを設計し、プロダクトロードマップを作成しました。\n③ DAO Historyのスマートコントラクトを開発しています。", [], ["エンジニア", "PM"])
    await poll.connect(otherAccount2).candidateToContributionPoll("遊んで暮らしてました😆", ["https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sunset_in_the_Carribean.jpg/700px-Sunset_in_the_Carribean.jpg"], ["遊び人"])

    // すでに2人は投票している状態にする
    await poll.connect(otherAccount).vote(6, [otherAccount.address, otherAccount2.address], [[1, 1, 4], [2, 3, 4]], ["すごい！！", "もっと頑張れ"])
    await poll.connect(otherAccount2).vote(6, [otherAccount.address, otherAccount2.address], [[5, 5, 5], [3, 5, 2]], ["やるやん", "俺すごい"])

}

export default setupDemo;
