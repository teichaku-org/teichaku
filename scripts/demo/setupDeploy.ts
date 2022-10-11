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

    // DaoHistoryのデプロイ
    const DaoHistory = await ethers.getContractFactory("DAOHistory");
    const daoHistory = await DaoHistory.deploy();
    await daoHistory.deployed();
    console.log("DAOHistory deployed to:", daoHistory.address);

    // Pollのデプロイ
    const Poll = await ethers.getContractFactory("Poll");
    const poll = await Poll.deploy("demo", 0);
    await poll.deployed();
    console.log("Poll deployed to:", poll.address);


    // HistoryNFTのデプロイ
    const HistoryNFT = await ethers.getContractFactory("HistoryNFT");
    const NFT_NAME = "DaoHistoryNFT"
    const NFT_SYMBOL = "DH"
    const historyNFT = await HistoryNFT.deploy(NFT_NAME, NFT_SYMBOL);
    await historyNFT.deployed();
    console.log("HistoryNFT deployed to:", historyNFT.address);


    // NFT化コントラクトのデプロイ
    const NFTCreator = await ethers.getContractFactory("HistoryNFTCreator");
    const nftCreator = await NFTCreator.deploy();
    await nftCreator.deployed();
    console.log("NFTCreator deployed to:", nftCreator.address);


    // DAONFTのデプロイ
    const DAONFT = await ethers.getContractFactory("DAONFT");
    const DAONFT_NAME = "DAO Membership NFT For Poll"
    const DAONFT_SYMBOL = "DAONFT"
    const daonft = await DAONFT.deploy(DAONFT_NAME, DAONFT_SYMBOL);
    await daonft.deployed();
    console.log("DAONFT deployed to:", daonft.address);


    // TODO: NFT化コントラクトが作成するNFTのアドレスを登録


    // Pollが利用するToken, DaoHistory, 投票のために必要なNFTの設定
    await poll.setDaoTokenAddress(token.address);
    await poll.setDaoHistoryAddress(daoHistory.address);
    await poll.setNftAddress(daonft.address)

    // Pollの締め切りができる権限をownerに持たせる
    await poll.setPollAdminRole(owner.address);

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