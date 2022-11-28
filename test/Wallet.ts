import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import setupDemo from "../scripts/demo/setupDemo";
import setupDeploy from "../scripts/demo/setupDeploy";

describe("Wallet", function () {
    async function deployFixture() {
        return setupDeploy()
    }


    describe("Walletにあるトークンを引き出す", function () {
        it("トークンを指定して引き出す", async function () {
            const { owner, wallet, token } = await loadFixture(deployFixture);

            const amount = ethers.utils.parseEther("1");
            //トークンを送金
            await token.mint(wallet.address, amount);

            const ownerBalanceBefore = await token.balanceOf(owner.address);
            await wallet.withdraw(token.address);
            const balanceAfter = await token.balanceOf(wallet.address);
            const ownerBalanceAfter = await token.balanceOf(owner.address);

            expect(balanceAfter).to.equal(0);
            expect(ownerBalanceAfter.sub(ownerBalanceBefore)).to.equal(amount);
        });

    });

});
