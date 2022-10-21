import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "ethers";
import { DAOToken, DAONFT, DAOHistory, Poll } from "../../typechain-types";
import { DAOHistoryItemStruct } from "../../typechain-types/contracts/DAOHistory";
import createAssessment from "./createAssessment";
import createDaoHistory from "./createDaoHistory";

async function setupDemo(
    token: DAOToken,
    owner: SignerWithAddress,
    otherAccount: SignerWithAddress,
    daonft: DAONFT,
    otherAccount2: SignerWithAddress,
    daoHistory: DAOHistory,
    poll: Poll) {

    // テストデータ追加のためDaoHistoryへのアクセス権を追加する
    await daoHistory.setupAddHistoryRole(owner.address)

    // Tokenの発行
    await token.mint(owner.address, ethers.utils.parseEther("100500"));
    await token.mint(otherAccount.address, ethers.utils.parseEther("500"));

    // Pollに送金する
    await token.transfer(poll.address, ethers.utils.parseEther("100000"));

    // DaoHistoryの追加
    await createDaoHistory(daoHistory)
    await createAssessment(daoHistory)

    // 辻褄を合わせるためにpollIdをインクリメントする
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()


    // 投票に立候補している状態にする
    await poll.connect(otherAccount).candidateToCurrentPoll("① DAO Historyを生み出すまでの議論のファシリテートを行いました。\n② DAO Historyを設計し、プロダクトロードマップを作成しました。\n③ DAO Historyのスマートコントラクトを開発しています。", [], ["エンジニア", "PM"])
    await poll.connect(otherAccount2).candidateToCurrentPoll("遊んで暮らしてました😆", ["https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sunset_in_the_Carribean.jpg/700px-Sunset_in_the_Carribean.jpg"], ["遊び人"])

    const pollId = await poll.currentMaxPollId()
    // すでに2人は投票している状態にする
    await poll.connect(otherAccount).vote(pollId, [otherAccount.address, otherAccount2.address], [[1, 2, 3], [2, 3, 4]], ["すごい！！", "もっと頑張れ"])
    await poll.connect(otherAccount2).vote(pollId, [otherAccount.address, otherAccount2.address], [[5, 5, 5], [5, 5, 5]], ["やるやん", "俺すごい"])

}

export default setupDemo;
