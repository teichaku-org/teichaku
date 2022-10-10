import { ethers } from "hardhat";

export default async function setupDeploy() {
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