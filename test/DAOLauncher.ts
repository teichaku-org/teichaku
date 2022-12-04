import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Poll } from "../typechain-types";

describe("DAO History", function () {
    async function deployFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount, otherAccount2, otherAccount3] = await ethers.getSigners();

        // PollFactoryのデプロイ
        const PollFactory = await ethers.getContractFactory("PollFactory");
        const pollFactory = await PollFactory.deploy();
        await pollFactory.deployed();

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

        // DaoTokenのデプロイ
        const DaoToken = await ethers.getContractFactory("DAOToken");
        const daoToken = await DaoToken.deploy("DAO Token", "DAO", 0);
        await daoToken.deployed();
        console.log("DaoToken deployed to:", daoToken.address);

        // DAOLauncherのデプロイ
        const DAOLauncher = await ethers.getContractFactory("DAOLauncher");
        const daoLauncher = await DAOLauncher.deploy(daoHistory.address);
        await daoLauncher.deployed();
        console.log("DAOLauncher deployed to:", daoLauncher.address);

        return { daoLauncher, daoToken, daoHistory, owner, otherAccount, otherAccount2 };
    }

    describe("Launcher", function () {
        it("Launcherで立ち上げたPollの所有者はユーザになっている", async function () {
            const { daoLauncher, daoToken, daoHistory } = await loadFixture(deployFixture);
            await daoLauncher.createDao(
                "test", "projectId", "name", "description", "url", "image",
                daoToken.address, 0, 0, 7);

            // Pollを取得する
            const pollAddress = await daoHistory.pollAddress("test", "projectId");
            const Poll = await ethers.getContractFactory("Poll");
            const poll = Poll.attach(pollAddress) as Poll;

            //adminロールを持っていれば処理を呼び出せる
            await poll.settleCurrentPollAndCreateNewPoll();
        });

    });

});
