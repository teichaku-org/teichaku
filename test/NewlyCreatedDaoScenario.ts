import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { DAOHistory, DAOHistoryItemStruct } from "../typechain-types/contracts/DAOHistory";
import { DAOToken, DAONFT } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import setupDemo from "../scripts/demo/setupDemo";
import setupDeploy from "../scripts/demo/setupDeploy";

describe("Newly Created Dao Scenario", function () {
    async function deployFixture() {
        return setupDeploy()
    }

    async function deployAndSetupDemoData() {
        const {
            owner, otherAccount, otherAccount2,
            token, daoHistory, poll, daonft
        } = await loadFixture(deployFixture);

        await setupDemo(token, owner, otherAccount, daonft, otherAccount2, daoHistory, poll);

        return {
            owner, otherAccount, otherAccount2,
            token, daoHistory, poll, daonft
        };
    }

    describe("DAOの追加", function () {
        it("新しいDAOを追加することができる", async function () {
            const { owner, daoHistory } = await loadFixture(deployFixture);
            await daoHistory.addDao("new", "new", "new", "new", "https://aaa.new", "")
            const pollAddress = await daoHistory.pollAddress("new", "new");
            const dao = await daoHistory.getDaoInfo("new");
            expect(await dao.name).to.equal("new");
        });

        it("DAO HistoryやAssessmentは空のリストになる", async function () {
            const { owner, daoHistory } = await loadFixture(deployFixture);
            await daoHistory.addDao("new", "new", "new", "new", "https://aaa.new", "")
            const pollAddress = await daoHistory.pollAddress("new", "new");
            const poll = await ethers.getContractAt("Poll", pollAddress);
            const activePollId = await poll.currentMaxPollId();
            const pollDetail = await poll.getPollDetail(activePollId);
            const history = await daoHistory.getDaoHistory("new", "new");
            const assessment = await daoHistory.getDaoAssessments("new", "new");
            expect(history.length).to.equal(0);
            expect(assessment.length).to.equal(0);
            expect(pollDetail.contributions).to.be.empty;
            expect(pollDetail.voters).to.be.empty;
        });
    });

    describe("最初の投票", function () {
        it("Pollに対して立候補をすることができる", async function () {
            const { owner, daoHistory } = await loadFixture(deployFixture);
            await daoHistory.addDao("new", "new", "new", "new", "https://aaa.new", "")
            const pollAddress = await daoHistory.pollAddress("new", "new");
            const poll = await ethers.getContractAt("Poll", pollAddress);
            const activePollId = await poll.currentMaxPollId();
            await poll.candidateToCurrentPoll("test", [], [])
            const pollDetail = await poll.getPollDetail(activePollId);
            expect(pollDetail.contributions.length).equal(1);
            expect(pollDetail.voters.length).equal(0);
        });

        it("Pollに対して投票をすることができる", async function () {
            const { owner, daoHistory, otherAccount } = await loadFixture(deployFixture);
            await daoHistory.addDao("new", "new", "new", "new", "https://aaa.new", "")
            const pollAddress = await daoHistory.pollAddress("new", "new");
            const poll = await ethers.getContractAt("Poll", pollAddress);
            const activePollId = await poll.currentMaxPollId();
            await poll.candidateToCurrentPoll("test", [], [])
            await poll.connect(otherAccount).vote(activePollId, [owner.address], [[1, 2, 3]], ["iine"])
            const pollDetail = await poll.getPollDetail(activePollId);
            expect(pollDetail.voters.length).equal(1);
        });
    });
});
