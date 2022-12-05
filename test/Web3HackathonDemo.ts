import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import setupDemo from "../scripts/demo/setupDemo";
import setupDeploy from "../scripts/demo/setupDeploy";

describe("Web3Hachathon Demo Scenario", function () {
    async function deployFixture() {
        const {
            owner, otherAccount, otherAccount2,
            token, daoHistory, poll, daonft
        } = await setupDeploy();
        return {
            owner, otherAccount, otherAccount2,
            token, daoHistory, poll, daonft
        }
    }

    async function deployAndSetupDemoData() {
        const {
            owner, otherAccount, otherAccount2,
            token, daoHistory, poll, daonft
        } = await loadFixture(deployFixture);

        const daoId = "demo"
        const projectId = "season1"
        await setupDemo(token, owner, otherAccount, daonft, otherAccount2, daoHistory, poll, daoId, projectId);

        return {
            owner, otherAccount, otherAccount2,
            token, daoHistory, poll, daonft
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

    });

    describe("デモデータをセットした後の状態について確認", function () {
        it("トークンはownerが100000保有している", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            const expected = ethers.utils.parseEther("100000");
            expect(await token.balanceOf(owner.address)).to.equal(expected);
        });

        it("demo, season1のdaoHistoryの状態は空でない", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            const demoHistory = await daoHistory.getDaoHistory("demo", "season1")
            expect(demoHistory.length).to.not.equal(0);
        });


    });

    describe("DAOの情報を取得", function () {
        it("DAOの名前などを取得できる", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            const daoInfo = await daoHistory.getDaoInfo("demo")
            expect(daoInfo.name).to.equal("Web3 Hackathon DAO");
            expect(daoInfo.description).equal("This is a Demo");
            expect(daoInfo.website).to.equal("https://englister.yunomy.com");
            expect(daoInfo.logo).equal("https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/englister/dao_membership/DAOmember_0000.png");
            expect(daoInfo.projects).to.members(["season1"])
        });
    });

    describe("Teichakuの操作紹介", function () {
        it("それぞれの貢献カードが複数存在する", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            const demoHistoryList = await daoHistory.getDaoHistory("demo", "season1")
            expect(demoHistoryList.length).to.not.equal(0);
        })
    });


    describe("投票部分の操作紹介", function () {

        it("pollIdを指定して詳細を取得することができる", async function () {
            const { owner, token, daoHistory, poll, otherAccount, otherAccount2 } = await deployAndSetupDemoData()
            const pollId = await poll.currentMaxPollId()
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
            const pollId = await poll.currentMaxPollId()
            const candidates = [otherAccount.address, otherAccount2.address]
            const points = [[5, 5, 5], [2, 2, 2]]
            const comments = ["コメント１", "コメント２"]
            await poll.vote(pollId, candidates, points, comments)

            const pollDetail = await poll.getPollDetail(pollId)
            expect(pollDetail.voters.length).to.equal(3);
        })

        it("投票時のperspectiveが保存されている", async function () {
            const { owner, token, daoHistory, poll, otherAccount, otherAccount2 } = await deployAndSetupDemoData()
            const pollId = await poll.currentMaxPollId()
            const candidates = [otherAccount.address, otherAccount2.address]
            const points = [[5, 5, 5], [2, 2, 2]]
            const comments = ["コメント１", "コメント２"]
            await poll.vote(pollId, candidates, points, comments)

            // voteに紐づいてperspectiveIdが保存されている
            const pollDetail = await poll.getVotes(pollId)
            expect(pollDetail[2].perspectiveId).to.equal(1);

            //その時のperspectiveの内容を取得できる
            const perspectives = await poll.getPerspectives(1)
            expect(perspectives[0]).to.equal("技術的難易度");
        })

        it("投票の上書きができる", async function () {
            const { owner, token, daoHistory, poll, otherAccount, otherAccount2 } = await deployAndSetupDemoData()
            const pollId = await poll.currentMaxPollId()
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

            const currentMaxPollId = await poll.currentMaxPollId()
            const activePoll = await poll.getPollDetail(currentMaxPollId)
            expect(activePoll.contributions.length).to.equal(3);
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
            const pollId = await poll.currentMaxPollId()
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
            const pollId = await poll.currentMaxPollId()
            const candidates = [otherAccount.address, otherAccount2.address]
            const points = [[5, 5, 5], [2, 2, 2]]
            const comments = ["コメント１", "コメント２"]
            await poll.vote(pollId, candidates, points, comments)

            await poll.settleCurrentPollAndCreateNewPoll()
            const history = await daoHistory.getDaoHistory("demo", "season1")
            const assessments = await daoHistory.getDaoAssessments("demo", "season1")

            // pollId = 6の投票結果を見る
            const otherAccount2History = history.filter((h) => h.contributor === otherAccount2.address && h.pollId.toNumber() == 6)
            const otherAccount2Assessment = assessments.filter((h) => h.contributor === otherAccount2.address && h.pollId.toNumber() == 6)

            // 貢献した回数は1件
            expect(otherAccount2History.length).to.equal(1);
            // どんな貢献をしたのか
            expect(otherAccount2History[0].contributionText).to.equal("遊んで暮らしてました😆");

            // 評価は2人から受けている (自分の評価は含まれない)
            expect(otherAccount2Assessment.length).to.equal(2);

            // コメントがどうだったか
            expect(otherAccount2Assessment[0].comment).to.equal("もっと頑張れ");

        })
    });
});
