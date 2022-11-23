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

        // PollFactoryのデプロイ
        const PollFactory = await ethers.getContractFactory("PollFactory");
        const pollFactory = await PollFactory.deploy();
        await pollFactory.deployed();
        console.log("PollFactory deployed to:", pollFactory.address);

        // Walletのデプロイ
        const Wallet = await ethers.getContractFactory("Wallet");
        const wallet = await Wallet.deploy();
        await wallet.deployed();

        // 手数料の設定
        const commissionRate = 5
        await pollFactory.setCommissionRate(commissionRate);
        await pollFactory.setCommissionAddress(wallet.address);

        // DaoHistoryのデプロイ
        const DaoHistory = await ethers.getContractFactory("DAOHistory");
        const daoHistory = await DaoHistory.deploy(pollFactory.address);
        await daoHistory.deployed();
        console.log("DAOHistory deployed to:", daoHistory.address);

        // Pollの取得
        await daoHistory.addDao("demo", "season1", "Web3 Hackathon DAO", "demo season1 description", "https://englister.yunomy.com", "https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/englister/dao_membership/DAOmember_0000.png");
        const pollAddress = await daoHistory.pollAddress("demo", "season1");
        const poll = await ethers.getContractAt("Poll", pollAddress);
        console.log("Poll deployed to:", poll.address);

        // Deploy Token
        const EnglisterToken = await ethers.getContractFactory("DAOToken");
        const NAME = "DAOTOKEN"
        const SYMBOL = "DAO"
        const INITIAL_SUPPLY = ethers.utils.parseEther("10100");
        const token = await EnglisterToken.deploy(NAME, SYMBOL, INITIAL_SUPPLY);

        // Deploy NFT
        const DaoNft = await ethers.getContractFactory("DAONFT");
        const nft = await DaoNft.deploy(NAME, SYMBOL);

        // 権限設定
        await token.setupMinterRole(poll.address);
        await poll.setTokenAddress(token.address, "0x0000000000000000000000000000000000000000");
        await daoHistory.setupAddHistoryRole(poll.address);

        // Pollに入金する
        await token.transfer(poll.address, ethers.utils.parseEther("10000"));

        //設定値
        await poll.setAssignmentToken(ethers.utils.parseEther("5000"), ethers.utils.parseEther("3000"));
        await poll.changePerspective(["p1", "p2", "p3"])
        return { token, poll, nft, wallet, owner, otherAccount, otherAccount2, otherAccount3 };
    }

    describe("Deployment", function () {
        it("poll Idの初期値は0", async function () {
            const { poll } = await loadFixture(deploy);
            expect(await poll.currentMaxPollId()).to.equal(0);
        });
    });

    describe("settleCurrentPollAndCreateNewPoll", function () {
        it("Pollを終了すると、pollIdがインクリメントされる", async function () {
            const { poll } = await loadFixture(deploy);
            await poll.settleCurrentPollAndCreateNewPoll();
            expect(await poll.currentMaxPollId()).to.equal(1);
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

            await expect(poll.vote(0, [owner.address], [[1]], [])).to.be.revertedWith("Invalid candidate");
        });

        it("ゼロ投票はできない", async function () {
            const { poll, token } = await loadFixture(deploy);

            await expect(poll.vote(0, [], [], [])).to.be.revertedWith("Candidates empty.");
        });

        it("候補者がいれば投票をすることができる", async function () {
            const { poll, otherAccount, token } = await loadFixture(deploy);

            await poll.connect(otherAccount).candidateToCurrentPoll("test1", [], [])
            await expect(await poll.vote(0, [otherAccount.address], [[1, 2, 3]], ["test"])).to.be.not.revertedWith("The candidate is not in the current poll.");
        });


        it("投票者の数とポイントの数が一致している必要がある", async function () {
            const { poll, otherAccount, token } = await loadFixture(deploy);


            await poll.connect(otherAccount).candidateToCurrentPoll("test1", [], [])

            await expect(poll.vote(0, [otherAccount.address], [[1, 2, 3], [1, 2, 3]], [])).to.be.revertedWith("invalid points");
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
        it("NFTを設定している場合、投票に必要なNFTを持っていないと投票できない", async function () {
            const { owner, token, nft, poll, otherAccount, otherAccount2 } = await loadFixture(deploy);

            await poll.setTokenAddress(token.address, nft.address);
            await poll.candidateToCurrentPoll("test1", [], [])

            // 投票権を持っているotherAccountとそうでないotherAccount2で投票を行う
            await nft.safeMint(otherAccount.address);

            await poll.connect(otherAccount).vote(0, [owner.address], [[1, 2, 3]], ["test"])
            await expect(poll.connect(otherAccount2).vote(0, [owner.address], [[1, 2, 3]], ["test"])).to.be.revertedWith("not eligible to vote.");
        });
    })

    describe("手数料の徴収", function () {
        it("スプリントごとに設定したウォレットに5%のトークンを徴収する", async function () {
            const { owner, token, nft, poll, otherAccount, wallet } = await loadFixture(deploy);

            await poll.candidateToCurrentPoll("test1", [], [])
            await poll.connect(otherAccount).vote(0, [owner.address], [[1, 2, 3]], ["test"])
            await poll.settleCurrentPollAndCreateNewPoll();

            const balance = await token.balanceOf(wallet.address);
            // 8000 * 0.05 = 400
            expect(balance).to.eq(ethers.utils.parseEther("400"));

        });
    })
});
