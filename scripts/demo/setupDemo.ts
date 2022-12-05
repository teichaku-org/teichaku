import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "ethers";
import { DAOHistory, DAONFT, DAOToken, Poll } from "../../typechain-types";
import createAssessment from "./createAssessment";
import createDaoHistory from "./createDaoHistory";

async function setupDemo(
    token: DAOToken,
    owner: SignerWithAddress,
    otherAccount: SignerWithAddress,
    daonft: DAONFT,
    otherAccount2: SignerWithAddress,
    daoHistory: DAOHistory,
    poll: Poll,
    daoId: string,
    projectId: string) {

    // テストデータ追加のためDaoHistoryへのアクセス権を追加する
    await daoHistory.setupAddHistoryRole(owner.address)
    console.log("daoHistory.setupAddHistoryRole(owner.address) done")

    // Tokenの発行
    await token.mint(owner.address, ethers.utils.parseEther("200000"));
    if (otherAccount)
        await token.mint(otherAccount.address, ethers.utils.parseEther("100000"));
    console.log("token.mint(owner.address, ethers.utils.parseEther(\"100500\")) done")

    // Pollに送金する
    await token.transfer(poll.address, ethers.utils.parseEther("100000"));
    console.log("token.transfer(poll.address, ethers.utils.parseEther(\"100000\")) done")

    // DaoHistoryの追加
    await createDaoHistory(daoHistory, daoId, projectId, token.address)
    console.log("createDaoHistory(daoHistory) done")
    await createAssessment(daoHistory, daoId, projectId)
    console.log("createAssessment(daoHistory) done")

    // 投票者と貢献者に配布するトークンの量を決定する
    await poll.setAssignmentToken(ethers.utils.parseEther("7000"), ethers.utils.parseEther("3000"))
    console.log("poll.setAssignmentToken(ethers.utils.parseEther(\"7000\"), ethers.utils.parseEther(\"3000\")) done")

    // 辻褄を合わせるためにpollIdをインクリメントする
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()
    await poll.settleCurrentPollAndCreateNewPoll()
    console.log("poll.settleCurrentPollAndCreateNewPoll() done")


    // 投票に立候補している状態にする
    if (otherAccount) {
        await poll.connect(otherAccount).candidateToCurrentPoll("① Teichakuを生み出すまでの議論のファシリテートを行いました。\n② Teichakuを設計し、プロダクトロードマップを作成しました。\n③ Teichakuのスマートコントラクトを開発しています。", [], ["エンジニア", "PM"])
        await poll.connect(otherAccount2).candidateToCurrentPoll("遊んで暮らしてました😆", ["https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sunset_in_the_Carribean.jpg/700px-Sunset_in_the_Carribean.jpg"], ["遊び人"])
        console.log("poll.connect(otherAccount).candidateToCurrentPoll() done")

        const pollId = await poll.currentMaxPollId()
        // すでに2人は投票している状態にする
        await poll.connect(otherAccount).vote(pollId, [otherAccount.address, otherAccount2.address], [[1, 2, 3], [2, 3, 4]], ["すごい！！", "もっと頑張れ"])
        await poll.connect(otherAccount2).vote(pollId, [otherAccount.address, otherAccount2.address], [[5, 5, 5], [5, 5, 5]], ["やるやん", "俺すごい"])
        console.log("poll.connect(otherAccount).vote() done")
    }
}

export default setupDemo;
