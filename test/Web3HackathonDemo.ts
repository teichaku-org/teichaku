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

        await setupDemo(token, owner, otherAccount, daonft, otherAccount2, daoHistory);

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

    describe("DAO Historyの操作紹介", function () {
        it("それぞれの貢献カードには、「貢献内容」「報酬」「ロール」「対象期間」「誰がやったか(address)」が記載されている", async function () {
            const { owner, token, daoHistory, poll } = await deployAndSetupDemoData()
            const demoHistoryList = await daoHistory.getDaoHistory("demo", 0)
            const demoHistory = demoHistoryList[0]

            //貢献内容
            expect(demoHistory.contributionText).to.equal("Web3Hachathonの準備");
            //報酬
            expect(demoHistory.reward).to.equal(ethers.utils.parseEther("100"));
            //ロール
            expect(demoHistory.roles).to.deep.equal(["owner", "engineer"]);
            //対象期間
            expect(demoHistory.timestamp).to.equal(1665390549);
            //誰がやったか
            expect(demoHistory.contributor).to.equal(owner.address);

            //→ 報酬額や、対象期間、ロールなどでソートができる
        })
    });


});
