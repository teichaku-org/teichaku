import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import setupDemo from "../scripts/demo/setupDemo";
import setupDeploy from "../scripts/demo/setupDeploy";

describe("Newly Created Dao Scenario", function () {
    async function deployFixture() {
        return setupDeploy()
    }


    describe("Walletにあるトークンを引き出す", function () {
        it("ETHを指定して引き出す", async function () {
            const { owner, wallet, token } = await loadFixture(deployFixture);

            const amount = ethers.utils.parseEther("1");
            //ETHを送金
            await owner.sendTransaction({
                to: wallet.address,
                value: amount
            });

            const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
            await wallet.withdraw(ethers.constants.AddressZero);
            const balanceAfter = await ethers.provider.getBalance(wallet.address);
            const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);

            expect(balanceAfter).to.equal(0);
            expect(ownerBalanceAfter.sub(ownerBalanceBefore)).to.equal(amount);
        });

    });

});
