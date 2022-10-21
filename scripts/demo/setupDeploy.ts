import { ethers } from "hardhat";

export default async function setupDeploy() {
    const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

    // tokenの発行
    const Token = await ethers.getContractFactory("DAOToken");
    const NAME = "Web3HachathonCoin"
    const SYMBOL = "W3HC"
    const INITIAL_SUPPLY = ethers.utils.parseEther("0");
    const token = await Token.deploy(NAME, SYMBOL, INITIAL_SUPPLY);
    await token.deployed();
    console.log("DAOToken deployed to:", token.address);

    // PollCreatorのデプロイ
    const PollCreator = await ethers.getContractFactory("PollCreator");
    const pollCreator = await PollCreator.deploy();
    await pollCreator.deployed();
    console.log("PollCreator deployed to:", pollCreator.address);

    // DaoHistoryのデプロイ
    const DaoHistory = await ethers.getContractFactory("DAOHistory");
    const daoHistory = await DaoHistory.deploy(pollCreator.address);
    await daoHistory.deployed();
    console.log("DAOHistory deployed to:", daoHistory.address);

    // Pollの取得
    await daoHistory.addDao("demo", "season1", "demo season1", "demo season1 description", "https://englister.yunomy.com", "https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/englister/dao_membership/DAOmember_0000.png");
    const pollAddress = await daoHistory.pollAddress("demo", "season1");
    const poll = await ethers.getContractAt("Poll", pollAddress);
    console.log("Poll deployed to:", poll.address);


    // DAONFTのデプロイ
    const DAONFT = await ethers.getContractFactory("DAONFT");
    const DAONFT_NAME = "DAO Membership NFT For Poll"
    const DAONFT_SYMBOL = "DAONFT"
    const daonft = await DAONFT.deploy(DAONFT_NAME, DAONFT_SYMBOL);
    await daonft.deployed();
    console.log("DAONFT deployed to:", daonft.address);


    // Pollが利用するToken, DaoHistory, 投票のために必要なNFTの設定
    await poll.setTokenAddress(token.address, "0x0000000000000000000000000000000000000000");
    console.log("Poll.setDaoTokenAddress");


    // Perspectiveの設定
    await poll.changePerspective(
        [
            "技術的難易度",
            "DAOへの影響",
            "仕事量"
        ]
    )
    console.log("Poll.changePerspective");


    return {
        owner, otherAccount, otherAccount2,
        token, daoHistory, poll, daonft
    };
}