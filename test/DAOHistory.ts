import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { DAONFT } from "../typechain-types/contracts/DAONFT";

describe("DAOHistory", function () {
    async function deployFixture() {
        const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

        const DAOHistory = await ethers.getContractFactory("DAOHistory");
        const history = await DAOHistory.deploy();

        return { history, owner, otherAccount, otherAccount2 };
    }

    describe("getDaoHistory", function () {
        it("デモデータを取得することができる", async function () {
            const { history } = await loadFixture(deployFixture);
            const result = await history.getDaoHistory("demo", 0);
            expect(result.length).to.be.equal(2);
        });
    });

    describe("getPersonalPollResult", function () {
        it("デモデータを取得することができる", async function () {
            const { history, owner } = await loadFixture(deployFixture);
            const result = history.getPersonalPollResult("demo", 0, 0, owner.address);
        });
    });

});
