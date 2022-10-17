import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Poll", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshopt in every test.
    async function deploy() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount, otherAccount2, otherAccount3] = await ethers.getSigners();

        const Poll = await ethers.getContractFactory("Poll");
        const poll = await Poll.deploy("demo", "season1");

        // Deploy Token
        const EnglisterToken = await ethers.getContractFactory("DAOToken");
        const NAME = "DAOTOKEN"
        const SYMBOL = "DAO"
        const INITIAL_SUPPLY = ethers.utils.parseEther("100");
        const token = await EnglisterToken.deploy(NAME, SYMBOL, INITIAL_SUPPLY);

        // Deploy NFT
        const DaoNft = await ethers.getContractFactory("DAONFT");
        const nft = await DaoNft.deploy(NAME, SYMBOL);

        // Deploy DAO History
        const DaoHistory = await ethers.getContractFactory("DAOHistory");
        const daoHistory = await DaoHistory.deploy();


        // 権限設定
        await poll.setPollAdminRole(owner.address);
        await token.setupMinterRole(poll.address);
        await poll.setDaoTokenAddress(token.address);
        await poll.setNftAddress(nft.address);
        await poll.setDaoHistoryAddress(daoHistory.address);
        await daoHistory.setupAddHistoryRole(poll.address);

        //設定値
        await poll.setContributorAssignmentToken(ethers.utils.parseEther("5000"));
        await poll.setSupporterAssignmentToken(ethers.utils.parseEther("3000"));
        await poll.changePerspective(["p1", "p2", "p3"])
        return { token, poll, nft, owner, otherAccount, otherAccount2, otherAccount3 };
    }

    describe("Deployment", function () {
        it("poll Idの初期値は0", async function () {
            const { poll } = await loadFixture(deploy);
            expect(await poll.currentMexPollId()).to.equal(0);
        });
    });

    describe("settleCurrentPollAndCreateNewPoll", function () {
        it("Pollを終了すると、pollIdがインクリメントされる", async function () {
            const { poll } = await loadFixture(deploy);
            await poll.settleCurrentPollAndCreateNewPoll();
            expect(await poll.currentMexPollId()).to.equal(1);
        });
    });

    describe("Candidate", function () {
        it("最初は候補者は誰もいない", async function () {
            const { poll } = await loadFixture(deploy);
            const candidates = await poll.getCurrentCandidates();
            expect(candidates).to.lengthOf(0);
        });

        it("立候補すると候補者が追加される(1人)", async function () {
            const { poll } = await loadFixture(deploy);
            await poll.candidateToCurrentPoll("test1", [], []);
            const candidates = await poll.getCurrentCandidates();
            expect(candidates).to.lengthOf(1);
        });

        it("立候補すると候補者が追加される(2人)", async function () {
            const { poll, otherAccount } = await loadFixture(deploy);
            await poll.candidateToCurrentPoll("test1", [], []);
            await poll.connect(otherAccount).candidateToCurrentPoll("test1", [], []);
            const candidates = await poll.getCurrentCandidates();
            expect(candidates).to.lengthOf(2);
        });

    });

    describe("Vote", function () {
        it("候補者がいない状況で投票することはできない", async function () {
            const { poll, owner, token } = await loadFixture(deploy);

            await expect(poll.vote(0, [owner.address], [[1]], [])).to.be.revertedWith("The candidate is not in the current poll.");
        });

        it("ゼロ投票はできない", async function () {
            const { poll, token } = await loadFixture(deploy);

            await expect(poll.vote(0, [], [], [])).to.be.revertedWith("Candidates must not be empty.");
        });

        it("候補者がいれば投票をすることができる", async function () {
            const { poll, otherAccount, token } = await loadFixture(deploy);

            await poll.connect(otherAccount).candidateToCurrentPoll("test1", [], [])
            await expect(await poll.vote(0, [otherAccount.address], [[1, 2, 3]], ["test"])).to.be.not.revertedWith("The candidate is not in the current poll.");
        });


        it("投票者の数とポイントの数が一致している必要がある", async function () {
            const { poll, otherAccount, token } = await loadFixture(deploy);


            await poll.connect(otherAccount).candidateToCurrentPoll("test1", [], [])

            await expect(poll.vote(0, [otherAccount.address], [[1, 2, 3], [1, 2, 3]], [])).to.be.revertedWith("The number of points is not valid.");
        });

        it("投票がされれば投票結果が保存される(1件)", async function () {
            const { poll, otherAccount, token } = await loadFixture(deploy);

            await poll.connect(otherAccount).candidateToCurrentPoll("test1", [], [])

            await poll.vote(0, [otherAccount.address], [[1, 2, 3]], ["test"])

            const votes = await poll.getCurrentVotes();
            expect(votes).to.lengthOf(1);
        });

        it("投票がされれば投票結果が保存される(2件)", async function () {
            const { poll, otherAccount, otherAccount2, token } = await loadFixture(deploy);

            // ownerとotherAccount2がトークンを持つようにする
            await token.transfer(otherAccount2.address, 10);


            await poll.connect(otherAccount).candidateToCurrentPoll("test1", [], [])

            await poll.vote(0, [otherAccount.address], [[1, 2, 3]], ["test"])
            await poll.connect(otherAccount2).vote(0, [otherAccount.address], [[1, 2, 3]], ["test"])

            const votes = await poll.getCurrentVotes();
            expect(votes).to.lengthOf(2);
        });



        it("投票の受付可否をownerが制御することができ、受付拒否している場合は投票できない", async function () {
            const { poll, otherAccount, token } = await loadFixture(deploy);


            await poll.connect(otherAccount).candidateToCurrentPoll("test1", [], [])
            await poll.setVotingEnabled(0, false);

            await expect(poll.vote(0, [otherAccount.address], [[1, 2, 3]], ["test"])).to.be.revertedWith("Voting is not enabled right now. Contact the admin to start voting.");
        });
    });

    describe("Settlement", function () {
        it("投票が実施されなかった場合は、誰にもトークンは送られない", async function () {
            const { poll, token, owner } = await loadFixture(deploy);

            await poll.settleCurrentPollAndCreateNewPoll();
            const balance = await token.balanceOf(owner.address);
            expect(balance).to.eq(ethers.utils.parseEther("100"));
        });

        it("投票が実施された場合は投票者と貢献者にトークンが送られる", async function () {
            const { poll, token, owner, otherAccount } = await loadFixture(deploy);

            await poll.connect(otherAccount).candidateToCurrentPoll("contributed something", [], [])
            await poll.vote(0, [otherAccount.address], [[1, 2, 3]], ["comment"])
            const balance1 = await token.balanceOf(owner.address);
            const balance2 = await token.balanceOf(otherAccount.address);
            await poll.settleCurrentPollAndCreateNewPoll();

            expect(await token.balanceOf(owner.address)).to.greaterThan(balance1);
            expect(await token.balanceOf(otherAccount.address)).to.greaterThan(balance2);
        });
    });

    describe("集計", function () {
        it("集計結果が想定通りか確認する(1)", async function () {
            // 貢献者1名 投票者1名であれば、貢献者に5000, 投票者に3000が配布される
            const { poll, token, owner, otherAccount } = await loadFixture(deploy);
            await poll.connect(otherAccount).candidateToCurrentPoll("contributed something", [], [])
            await poll.vote(0, [otherAccount.address], [[1, 2, 3]], ["comment"])
            const balance1 = await token.balanceOf(owner.address);
            const balance2 = await token.balanceOf(otherAccount.address);
            await poll.settleCurrentPollAndCreateNewPoll();

            expect(await token.balanceOf(owner.address)).to.eq(balance1.add(ethers.utils.parseEther("3000")));
            expect(await token.balanceOf(otherAccount.address)).to.eq(balance2.add(ethers.utils.parseEther("5000")));
        });

        it("集計結果が想定通りか確認する(2)", async function () {
            // 貢献者1名 投票者2名であれば、貢献者に5000, 投票者に1500が配布される
            const { poll, token, owner, otherAccount } = await loadFixture(deploy);
            await poll.connect(otherAccount).candidateToCurrentPoll("contributed something", [], [])
            await poll.vote(0, [otherAccount.address], [[1, 2, 3]], ["comment"])
            await poll.connect(otherAccount).vote(0, [otherAccount.address], [[1, 2, 3]], ["comment"])
            const balance1 = await token.balanceOf(owner.address);
            const balance2 = await token.balanceOf(otherAccount.address);
            await poll.settleCurrentPollAndCreateNewPoll();

            expect(await token.balanceOf(owner.address)).to.eq(balance1.add(ethers.utils.parseEther("1500")));
            expect(await token.balanceOf(otherAccount.address)).to.eq(balance2.add(ethers.utils.parseEther("6500")));
        });

        it("集計結果が想定通りか確認する(3)", async function () {
            // 貢献者2名 投票者1名で、投票が平等であれば貢献者に2500ずつ配布される
            const { poll, token, owner, otherAccount, otherAccount2 } = await loadFixture(deploy);
            await poll.connect(otherAccount).candidateToCurrentPoll("contributed something", [], [])
            await poll.connect(otherAccount2).candidateToCurrentPoll("contributed something", [], [])

            await poll.vote(0, [otherAccount.address, otherAccount2.address], [[1, 2, 3], [1, 2, 3]], ["comment", "comment"])

            const balance1 = await token.balanceOf(otherAccount.address);
            const balance2 = await token.balanceOf(otherAccount2.address);
            await poll.settleCurrentPollAndCreateNewPoll();

            expect(await token.balanceOf(otherAccount.address)).to.eq(balance1.add(ethers.utils.parseEther("2500")));
            expect(await token.balanceOf(otherAccount2.address)).to.eq(balance2.add(ethers.utils.parseEther("2500")));
        });

        it("集計結果が想定通りか確認する(4)", async function () {
            // 貢献者2名 投票者1名で、投票に差をつけて候補者Aが3倍もらえるようにすると、3750, 1250で配布される
            const { poll, token, owner, otherAccount, otherAccount2 } = await loadFixture(deploy);
            await poll.connect(otherAccount).candidateToCurrentPoll("contributed something", [], [])
            await poll.connect(otherAccount2).candidateToCurrentPoll("contributed something", [], [])

            await poll.vote(0, [otherAccount.address, otherAccount2.address], [[3, 6, 9], [1, 2, 3]], ["comment", "comment"])

            const balance1 = await token.balanceOf(otherAccount.address);
            const balance2 = await token.balanceOf(otherAccount2.address);
            await poll.settleCurrentPollAndCreateNewPoll();

            expect(await token.balanceOf(otherAccount.address)).to.eq(balance1.add(ethers.utils.parseEther("3750")));
            expect(await token.balanceOf(otherAccount2.address)).to.eq(balance2.add(ethers.utils.parseEther("1250")));
        });

        it("集計結果が想定通りか確認する(5)", async function () {
            // 貢献者2名 投票者2名で、投票に差をつけて候補者Aが3倍もらえるようにすると、3750, 1250で配布される
            const { poll, token, owner, otherAccount, otherAccount2, otherAccount3 } = await loadFixture(deploy);
            await poll.connect(otherAccount).candidateToCurrentPoll("contributed something", [], [])
            await poll.connect(otherAccount2).candidateToCurrentPoll("contributed something", [], [])

            await poll.vote(0, [otherAccount.address, otherAccount2.address], [[3, 6, 9], [1, 2, 3]], ["comment", "comment"])
            await poll.connect(otherAccount3).vote(0, [otherAccount.address, otherAccount2.address], [[3, 6, 9], [1, 2, 3]], ["comment", "comment"])

            const balance1 = await token.balanceOf(otherAccount.address);
            const balance2 = await token.balanceOf(otherAccount2.address);
            await poll.settleCurrentPollAndCreateNewPoll();

            expect(await token.balanceOf(otherAccount.address)).to.eq(balance1.add(ethers.utils.parseEther("3750")));
            expect(await token.balanceOf(otherAccount2.address)).to.eq(balance2.add(ethers.utils.parseEther("1250")));
        });

        it("集計結果が想定通りか確認する(6)", async function () {
            // 貢献者2名 投票者2名で、投票に差をつけるが、合計が同じであれば2500ずつ配布っされる
            const { poll, token, owner, otherAccount, otherAccount2, otherAccount3 } = await loadFixture(deploy);
            await poll.connect(otherAccount).candidateToCurrentPoll("contributed something", [], [])
            await poll.connect(otherAccount2).candidateToCurrentPoll("contributed something", [], [])

            await poll.vote(0, [otherAccount.address, otherAccount2.address], [[3, 6, 9], [1, 2, 3]], ["comment", "comment"])
            await poll.connect(otherAccount3).vote(0, [otherAccount.address, otherAccount2.address], [[1, 2, 3], [3, 6, 9]], ["comment", "comment"])

            const balance1 = await token.balanceOf(otherAccount.address);
            const balance2 = await token.balanceOf(otherAccount2.address);
            await poll.settleCurrentPollAndCreateNewPoll();

            expect(await token.balanceOf(otherAccount.address)).to.eq(balance1.add(ethers.utils.parseEther("2500")));
            expect(await token.balanceOf(otherAccount2.address)).to.eq(balance2.add(ethers.utils.parseEther("2500")));
        });
    });

    describe("投票の権利", function () {
        it("投票に必要なNFTを持っていないと投票できない", async function () {
            const { owner, token, nft, poll, otherAccount, otherAccount2 } = await loadFixture(deploy);

            await poll.setRequiredTokenForVote(1);
            await poll.candidateToCurrentPoll("test1", [], [])

            // 投票権を持っているotherAccountとそうでないotherAccount2で投票を行う
            await nft.safeMint(otherAccount.address);

            await poll.connect(otherAccount).vote(0, [owner.address], [[1, 2, 3]], ["test"])
            await expect(poll.connect(otherAccount2).vote(0, [owner.address], [[1, 2, 3]], ["test"])).to.be.revertedWith("You are not eligible to vote.");
        });
    })
});
