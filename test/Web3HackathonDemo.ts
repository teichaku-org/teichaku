import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { DAOHistoryItemStruct } from "../typechain-types/contracts/DAOHistory";

describe("Web3Hachathon Demo Scenario", function () {
    async function deployFixture() {
        const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

        // tokenの発行
        const Token = await ethers.getContractFactory("DAOToken");
        const NAME = "Web3HachathonCoin"
        const SYMBOL = "W3HC"
        const INITIAL_SUPPLY = ethers.utils.parseEther("0");
        const token = await Token.deploy(NAME, SYMBOL, INITIAL_SUPPLY);

        // DaoHistoryのデプロイ
        const DaoHistory = await ethers.getContractFactory("DAOHistory");
        const daoHistory = await DaoHistory.deploy();

        // Pollのデプロイ
        const Poll = await ethers.getContractFactory("Poll");
        const poll = await Poll.deploy();

        // HistoryNFTのデプロイ
        const HistoryNFT = await ethers.getContractFactory("HistoryNFT");
        const NFT_NAME = "DaoHistoryNFT"
        const NFT_SYMBOL = "DH"
        const historyNFT = await HistoryNFT.deploy(NFT_NAME, NFT_SYMBOL);

        // NFT化コントラクトのデプロイ
        const NFTCreator = await ethers.getContractFactory("HistoryNFTCreator");
        const nftCreator = await NFTCreator.deploy();

        // DAONFTのデプロイ
        const DAONFT = await ethers.getContractFactory("DAONFT");
        const DAONFT_NAME = "DAO Membership NFT For Poll"
        const DAONFT_SYMBOL = "DAONFT"
        const daonft = await DAONFT.deploy(DAONFT_NAME, DAONFT_SYMBOL);


        // TODO: NFT化コントラクトが作成するNFTのアドレスを登録


        // Pollが利用するToken, DaoHistory, 投票のために必要なNFTの設定
        await poll.setDaoTokenAddress(token.address);
        await poll.setDaoHistoryAddress(daoHistory.address);
        await poll.setNftAddress(daonft.address)


        // PollはTokenをmintする権限を持つ
        await token.setupMinterRole(poll.address);

        // Perspectiveの設定
        await poll.changePerspective(
            [
                "ビジョンの実現に貢献している",
                "トークン価値の向上に寄与している",
                "他の人を助けている"
            ]
        )

        // DaoHistoryへのアクセス権を追加する
        await daoHistory.setupAddHistoryRole(owner.address)
        await daoHistory.setupAddHistoryRole(poll.address)

        // TODO: NFTのbaseURLを設定する

        return {
            owner, otherAccount, otherAccount2,
            token, daoHistory, poll, historyNFT, nftCreator, daonft
        };
    }

    async function deployAndSetupDemoData() {
        const {
            owner, otherAccount, otherAccount2,
            token, daoHistory, poll, historyNFT, nftCreator, daonft
        } = await loadFixture(deployFixture);

        // Tokenの発行
        await token.mint(owner.address, ethers.utils.parseEther("500"));
        await token.mint(otherAccount.address, ethers.utils.parseEther("500"));

        // DaoHistoryの追加
        const daoHistoryItem1: DAOHistoryItemStruct = {
            contributionText: "Web3Hachathonの準備",
            reward: ethers.utils.parseEther("100"),
            roles: ["owner", "engineer"],
            timestamp: await time.latest(),
            contributor: owner.address,
            pollId: 0,
            score: {
                scores: [3, 4, 2],
                perspectiveId: 1
            }
        }
        await daoHistory.addDaoHistory("demo", 0, daoHistoryItem1);

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
            const demoHistory = await daoHistory.getDaoHistory("demo", 0)
            expect(demoHistory.length).to.equal(expected);
        });
    });

    describe("デモデータをセットした後の状態について確認", function () {
        it("トークンはownerが500保有している", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            const expected = ethers.utils.parseEther("500");
            expect(await token.balanceOf(owner.address)).to.equal(expected);
        });

        it("daoHistoryの状態は空でない", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            const demoHistory = await daoHistory.getDaoHistory("demo", 0)
            expect(demoHistory.length).to.not.equal(0);
        });
    });
});
