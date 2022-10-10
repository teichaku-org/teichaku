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


});
