import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { DAOHistory, DAOHistoryItemStruct } from "../typechain-types/contracts/DAOHistory";
import { DAOToken, DAONFT } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import setupDemo from "../scripts/demo/setupDemo";
import setupDeploy from "../scripts/demo/setupDeploy";

describe("Web3Hachathon Demo Scenario", function () {
    async function deployFixture() {
        return setupDeploy()
    }

    async function deployAndSetupDemoData() {
        const {
            owner, otherAccount, otherAccount2,
            token, daoHistory, poll, historyNFT, nftCreator, daonft
        } = await loadFixture(deployFixture);

        await setupDemo(token, owner, otherAccount, daonft, otherAccount2, daoHistory, poll);

        return {
            owner, otherAccount, otherAccount2,
            token, daoHistory, poll, historyNFT, nftCreator, daonft
        };
    }

    describe("デプロイ後の初期状態について確認する", function () {
        it("トークンはownerが0保有している", async function () {
            const { owner, token, daoHistory, poll } = await loadFixture(deployFixture);
            const expected = ethers.utils.parseEther("0");
            expect(await token.balanceOf(owner.address)).to.equal(expected);
        });

        it("daoHistoryの状態は空っぽ", async function () {
            const { owner, token, daoHistory, poll } = await loadFixture(deployFixture);
            const expected = 0;
            const demoHistory = await daoHistory.getDaoHistory("demo", "season1")
            expect(demoHistory.length).to.equal(expected);
        });

        it("アクティブな投票の一覧を取得したときに基本的な情報は全て０", async function () {
            const { owner, token, daoHistory, poll } = await loadFixture(deployFixture);
            const activePolls = await poll.getActivePolls()
            const activePoll = activePolls[0]

            //投票開始日
            expect(activePoll.startTimeStamp).to.equal(0);
            //投票者の数
            expect(activePoll.votersCount).to.equal(0);
            //立候補者の数
            expect(activePoll.candidatesCount).to.equal(0);
            //pollId
            expect(activePoll.pollId).to.equal(0);
        })
    });

    describe("デモデータをセットした後の状態について確認", function () {
        it("トークンはownerが500保有している", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            const expected = ethers.utils.parseEther("500");
            expect(await token.balanceOf(owner.address)).to.equal(expected);
        });

        it("demo, season1のdaoHistoryの状態は空でない", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            const demoHistory = await daoHistory.getDaoHistory("demo", "season1")
            expect(demoHistory.length).to.not.equal(0);
        });


        it("pollIdが6になっている", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            const activePolls = await poll.getActivePolls()
            const activePoll = activePolls[0]

            //pollId
            expect(activePoll.pollId).to.equal(6);
        })
    });

    describe("DAO Historyの操作紹介", function () {
        it("それぞれの貢献カードには、「貢献内容」「報酬」「ロール」「対象期間」「誰がやったか(address)」が記載されている", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            const demoHistoryList = await daoHistory.getDaoHistory("demo", "season1")
            const demoHistory = demoHistoryList[0]

            //貢献内容
            expect(demoHistory.contributionText).to.equal("①アプリ側でも「他の人の意見を参考にする」を見れるようにして、アプリのユーザも日本語の意見を考えやすくした\nhttps://twitter.com/IT_KOTA3/status/1539245638239526913\n\n②アプリから「最初の３問はハートを消費しない」というウソの文言を削除し、「問題をスタート時にハートが１つ消費される」ということを記載した");
            //報酬
            expect(demoHistory.reward).to.equal(ethers.utils.parseEther("669.0197786367365"));
            //ロール
            expect(demoHistory.roles).to.deep.equal(["デザイナー"]);
            //対象期間
            expect(demoHistory.timestamp).to.equal(1657274544);
            //誰がやったか
            expect(demoHistory.contributor).to.equal("0x261f350466E17cbDf9Bc00E2B3875685EF9aB07C");
            // poll Id
            expect(demoHistory.pollId).to.equal(0);
            //→ 報酬額や、対象期間、ロールなどでソートができる
        })
    });


    describe("投票部分の操作紹介", function () {
        it("現在アクティブな投票の一覧を取得することができる", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            const activePolls = await poll.getActivePolls()

            //デモでは常にアクティブな投票が１つ存在している
            expect(activePolls.length).to.equal(1);
        })

        it("投票の一覧では、基本的な情報を取得できる", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            const activePolls = await poll.getActivePolls()
            const activePoll = activePolls[0]

            //投票開始日
            expect(activePoll.startTimeStamp).to.not.equal(0);
            //投票者の数
            expect(activePoll.votersCount).to.equal(2);
            //立候補者の数
            expect(activePoll.candidatesCount).to.equal(2);
            //pollId
            expect(activePoll.pollId).to.equal(6);
        })

        it("pollIdを指定して詳細を取得することができる", async function () {
            const { owner, token, daoHistory, poll, otherAccount, otherAccount2 } = await deployAndSetupDemoData()
            const pollId = 6
            const pollDetail = await poll.getPollDetail(pollId)

            //投票開始日
            expect(pollDetail.startTimeStamp).to.not.equal(0);

            //立候補をしている人のリスト
            expect(pollDetail.contributions.length).to.equal(2);
            expect(pollDetail.contributions[1].contributionText).to.equal("遊んで暮らしてました😆")
            expect(pollDetail.contributions[1].contributor).to.equal(otherAccount2.address)
            expect(pollDetail.contributions[1].evidences[0]).to.not.equal("")

            //すでに投票した人たちのアドレス
            expect(pollDetail.voters.length).to.equal(2);
            expect(pollDetail.voters[0]).to.equal(otherAccount.address);
            expect(pollDetail.voters[1]).to.equal(otherAccount2.address);

            //投票開始日
            expect(pollDetail.startTimeStamp).to.not.equal(0);

            //pollId
            expect(pollDetail.pollId).to.equal(pollId);
        })


        it("実際に投票を実施することができる", async function () {
            const { owner, token, daoHistory, poll, otherAccount, otherAccount2 } = await deployAndSetupDemoData()
            const pollId = 6
            const candidates = [otherAccount.address, otherAccount2.address]
            const points = [[5, 5, 5], [2, 2, 2]]
            const comments = ["コメント１", "コメント２"]
            await poll.vote(pollId, candidates, points, comments)

            const pollDetail = await poll.getPollDetail(pollId)
            expect(pollDetail.voters.length).to.equal(3);
        })

        it("投票時のperspectiveが保存されている", async function () {
            const { owner, token, daoHistory, poll, otherAccount, otherAccount2 } = await deployAndSetupDemoData()
            const pollId = 6
            const candidates = [otherAccount.address, otherAccount2.address]
            const points = [[5, 5, 5], [2, 2, 2]]
            const comments = ["コメント１", "コメント２"]
            await poll.vote(pollId, candidates, points, comments)

            // voteに紐づいてperspectiveIdが保存されている
            const pollDetail = await poll.getVotes(pollId)
            expect(pollDetail[2].perspectiveId).to.equal(1);

            //その時のperspectiveの内容を取得できる
            const perspectives = await poll.getPerspectives(1)
            expect(perspectives[0]).to.equal("ビジョンの実現に貢献している");
        })

        it("投票の上書きができる", async function () {
            const { owner, token, daoHistory, poll, otherAccount, otherAccount2 } = await deployAndSetupDemoData()
            const pollId = 6
            const candidates = [otherAccount.address, otherAccount2.address]
            const points = [[5, 5, 5], [2, 2, 2]]
            const comments = ["コメント１", "コメント２"]
            await poll.vote(pollId, candidates, points, comments)

            const fixedComments = ["修正済みコメント１", "修正済みコメント２"]
            await poll.vote(pollId, candidates, points, fixedComments)

            const pollDetail = await poll.getCurrentVotes()
            expect(pollDetail[2].comments[0]).to.equal("修正済みコメント１");
        })
    });

    describe("貢献登録部分の操作紹介", function () {
        it("自分も貢献した内容を登録することができる", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            await poll.candidateToCurrentPoll("テスト", ["https://yahoo.co.jp"], ["エンジニア", "PM"])

            const activePolls = await poll.getActivePolls()
            const activePoll = activePolls[0]
            expect(activePoll.candidatesCount).to.equal(3);
        })

        it("上書きをすることもできる", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            await poll.candidateToCurrentPoll("テスト", ["https://yahoo.co.jp"], ["エンジニア", "PM"])
            await poll.candidateToCurrentPoll("修正後テスト", [], ["エンジニア", "PM"])

            const detail = await poll.getPollDetail(6)
            expect(detail.contributions.length).to.equal(3);
            expect(detail.contributions[2].contributionText).to.equal("修正後テスト");
        })
    });

    describe("投票の締め切りができる", function () {
        it("投票を締め切ることで、各自のトークン量が増えていることを確認する", async function () {
            const { owner, token, daoHistory, poll, otherAccount, otherAccount2 } = await deployAndSetupDemoData()
            const pollId = 6
            const candidates = [otherAccount.address, otherAccount2.address]
            const points = [[5, 5, 5], [2, 2, 2]]
            const comments = ["コメント１", "コメント２"]
            await poll.vote(pollId, candidates, points, comments)

            const beforeBalance1 = await token.balanceOf(owner.address)
            const beforeBalance2 = await token.balanceOf(otherAccount.address)
            const beforeBalance3 = await token.balanceOf(otherAccount2.address)
            await poll.settleCurrentPollAndCreateNewPoll()
            const afterBalance1 = await token.balanceOf(owner.address)
            const afterBalance2 = await token.balanceOf(otherAccount.address)
            const afterBalance3 = await token.balanceOf(otherAccount2.address)
            expect(afterBalance1).to.greaterThan(beforeBalance1);
            expect(afterBalance2).to.greaterThan(beforeBalance2);
            expect(afterBalance3).to.greaterThan(beforeBalance3);
        })

        it("投票結果がDAO Historyに保存されていることを確認できる", async function () {
            const { owner, token, daoHistory, poll, otherAccount, otherAccount2 } = await deployAndSetupDemoData()
            const pollId = 6
            const candidates = [otherAccount.address, otherAccount2.address]
            const points = [[5, 5, 5], [2, 2, 2]]
            const comments = ["コメント１", "コメント２"]
            await poll.vote(pollId, candidates, points, comments)

            await poll.settleCurrentPollAndCreateNewPoll()
            const history = await daoHistory.getDaoHistory("demo", "season1")

            // pollId = 6の投票結果を見る
            const otherAccount2History = history.filter((h) => h.contributor === otherAccount2.address && h.pollId.toNumber() == 6)
            expect(otherAccount2History.length).to.equal(1);
            // どんな貢献をしたのか
            expect(otherAccount2History[0].contributionText).to.equal("遊んで暮らしてました😆");

            // スコアがどうだったのか
            expect(otherAccount2History[0].score.map(x => x.toString())).to.equal(["5", "5", "5"]);

            // コメントがどうだったか
            //expect(otherAccount2History[0].comment).to.equal("コメント１");

        })
    });
});
