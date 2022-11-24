import { ethers } from "ethers";
import { DAOHistory, DAOHistoryItemStruct } from "../../typechain-types/contracts/DAOHistory.sol/DAOHistory";

export default async (daoHistory: DAOHistory, daoId: string, projectId: string, tokenAddress: string) => {
    const data = [
        {
            "contributionText": "①アプリ側でも「他の人の意見を参考にする」を見れるようにして、アプリのユーザも日本語の意見を考えやすくした\nhttps://twitter.com/IT_KOTA3/status/1539245638239526913\n\n②アプリから「最初の３問はハートを消費しない」というウソの文言を削除し、「問題をスタート時にハートが１つ消費される」ということを記載した",
            "reward": 669.0197786367365,
            "roles": "デザイナー",
            "timestamp": 1657274544,
            "contributor": "0x261f350466E17cbDf9Bc00E2B3875685EF9aB07C",
            "pollId": 0
        },
        {
            "contributionText": "DAOテストネット運用会に参加しました。",
            "reward": 189.39485139303116,
            "roles": "デザイナー",
            "timestamp": 1663408944,
            "contributor": "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
            "pollId": 5
        },
        {
            "contributionText": "・プロダクトロードマップ作成までの5ステップを作成しました。\n・ステップ１と２までcompleteしました\n\nhttps://iris-bird-24b.notion.site/Englister-DAO-b29016b20f2b42ff8a4465de2ce4a27a\n\nhttps://www.figma.com/file/9QEWA8FpMRmQngzeUWNIcN/Englister-DAO%E3%81%AE%E6%B4%BB%E5%8B%95%E3%82%92%E8%A6%96%E8%A6%9A%E5%8C%96%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B?node-id=0%3A1",
            "reward": 581.4644281109368,
            "roles": "開発者",
            "timestamp": 1663408944,
            "contributor": "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
            "pollId": 5
        },
        {
            "contributionText": "①モバイルアプリの英語日記の開発についてレビューしていただく段階まで一通り完了しました。\nhttps://github.com/KitaharaMugiro/englister/pull/35\n\n②NFTの保有者毎のトークンIDを取得する関数についてドキュメントから調べました。\nhttps://discord.com/channels/931274934997639258/1011539489681838180/1019626309246259301",
            "reward": 557.1601762435388,
            "roles": "プロダクトマネージャー",
            "timestamp": 1663408944,
            "contributor": "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
            "pollId": 5
        }
    ]

    function createRandomScore() {
        //スコアは少数がつけられないことに注意
        return Math.floor(Math.random() * 500);
    }

    for (const item of data) {
        const randomUrlList = []
        for (let i = 0; i < 5; i++) {
            if (Math.random() > 0.8) {
                randomUrlList.push("https://" + Math.random().toString(36).slice(-8) + ".com")
            }
        }
        const daoHistoryItem: DAOHistoryItemStruct = {
            contributionText: item.contributionText,
            reward: ethers.utils.parseEther(item.reward.toString()),
            rewardToken: tokenAddress,
            roles: [item.roles],
            timestamp: item.timestamp,
            contributor: item.contributor,
            pollId: item.pollId,
            evidences: randomUrlList,
        };
        await daoHistory.addDaoHistory(daoId, projectId, daoHistoryItem)
    }


}