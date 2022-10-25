import { BigNumber, ethers } from "ethers";
import { AssessmentStruct, DAOHistory, } from "../../typechain-types/contracts/DAOHistory";

export default async (daoHistory: DAOHistory) => {
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
            "contributionText": "① 問題を解いたときに出てくる英語年齢が高めに出るように設定してシェアされやすくした\n\n② 問題文を英語表示できるようにすることで、ユーザが英語で考えやすくした\nhttps://github.com/KitaharaMugiro/deepl_english_learning/pull/30\n\n③ web3.jsを使ってDAO参加者にトークンを送り、今後のLearn to Earnに向けた礎を築いた\n\n④ Englister DiaryとProfileのAPIを作成\nhttps://www.notion.so/Englister-Diary-f98cd321d0324f6c809aeb19ed7f580a\nhttps://www.notion.so/24cb285aa1834ed5be264173f092002d",
            "reward": 1051.7379457012855,
            "roles": "プロダクトマネージャー",
            "timestamp": 1657274544,
            "contributor": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "pollId": 0
        },
        {
            "contributionText": "Mirror.xyzとツイッターでEnglisterについて宣伝しました。\n下記エビデンスURL\nMirror.xyz↓\nhttps://mirror.xyz/0x7F55FaA06a571962A130774C9F7Be7dFbC804C79/92wJwWeWMyWtwoEnl5m2BfEBmFvQaVCUKRVDoLsJ19g\nツイッター↓\nhttps://twitter.com/NULLPOP2/status/1540344987723804672",
            "reward": 302.0729900997783,
            "roles": "マーケター",
            "timestamp": 1657274544,
            "contributor": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            "pollId": 0
        },
        {
            "contributionText": "フロントエンド開発の効率化のため\ndocker-compose及びdockerファイルを作成",
            "reward": 517.7756937185795,
            "roles": "デザイナー",
            "timestamp": 1657274544,
            "contributor": "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
            "pollId": 0
        },
        {
            "contributionText": "EnglisterDAOトークンの受け取りについて、提案と、受け取り方の資料作成をしました。\n以下ドキュメントの「Englister_20220630.pdf」になります。\nhttps://button-hearing-b81.notion.site/398ab68585d146bfa9228f3233e80d09",
            "reward": 511.2434734645023,
            "roles": "開発者",
            "timestamp": 1657274544,
            "contributor": "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            "pollId": 0
        },
        {
            "contributionText": "NounsDAO関連の情報共有をさせていただきました。\nhttps://discord.com/channels/931274934997639258/986877819319635988/988970775337926676",
            "reward": 326.22186396829017,
            "roles": "マーケター",
            "timestamp": 1657274544,
            "contributor": "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
            "pollId": 0
        },
        {
            "contributionText": "Englisterを使ってみた感想を共有しました。\nhttps://discord.com/channels/931274934997639258/987697427538669568/993105791932432475",
            "reward": 289.3254104716373,
            "roles": "開発者",
            "timestamp": 1657274544,
            "contributor": "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
            "pollId": 0
        },
        {
            "contributionText": "① 質問文の修正・再構成（110題）\n　　→ より読みやすくなった\nhttps://docs.google.com/spreadsheets/d/1NAIwrrQN2ujG8j3tme49SAmuyLjO5DcLmllxt9NV7Ls/edit#gid=1957942025\n\n② 新機能「Englister Diary」の骨子を考えた\n　　→「言いたいことを英語で言う」というEnglisterの目指す姿に近づけた\nhttps://trello.com/c/egxcZJnS",
            "reward": 662.8712148751883,
            "roles": "デザイナー",
            "timestamp": 1657274544,
            "contributor": "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
            "pollId": 0
        },
        {
            "contributionText": "・質問文を349個追加しました：主にBasic/ディベート/MBA質問集。",
            "reward": 669.7316290640024,
            "roles": "マーケター",
            "timestamp": 1657274544,
            "contributor": "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
            "pollId": 0
        },
        {
            "contributionText": "① Englister DAOをブロックチェーン上に実現するための簡易な設計を行なった。\nブロックチェーン化させることによって運営の自動化・トラストレス化・グローバル化が期待でき、かつこのテンプレートを横展開する可能性を示した。\nhttps://button-hearing-b81.notion.site/Englister-DAO-3d63aa6029a24ca9a58f1a4e64bb9f18\n\n\n② Learn to Earnの簡易な設計を行なった。ユーザのリテンションを高める施策。\nhttps://www.notion.so/Learn-to-Earn-4fb0256b08de4db89f1d17c97874830e\n\n③ Learn to Earnの実装を途中まで実施。",
            "reward": 1452.8590705811143,
            "roles": "プロダクトマネージャー",
            "timestamp": 1658484144,
            "contributor": "0x261f350466E17cbDf9Bc00E2B3875685EF9aB07C",
            "pollId": 1
        },
        {
            "contributionText": "① 下記カテゴリの問題文を修正して、読みやすくした。　\n　　・Englister Normal （5題）\n　　・TOFEL対策（29題）\n　エビデンスのGoogleスプレッドシートは閲覧権限がかかっているため、実際に解いて確認してみてください！",
            "reward": 757.0325408121033,
            "roles": "開発者",
            "timestamp": 1658484144,
            "contributor": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "pollId": 1
        },
        {
            "contributionText": "① mugi#1414 さん作成の、Englisterトークンに関するスマートコントラクタを、\n　Ethereumのテストネットワーク（goerli）へ乗せました（Deploy）。\n　本番のEthereumではありませんが、ENGトークンが100トークン、Ethereum上に誕生しました！！！！\n　Englister DAO開発の第２歩を踏みました。\n\n　ソースコードは、ブロックチェーンだけに、オープンな形で世界中の誰でも閲覧可能です。\n　（Veriify＆Publish）\n　https://goerli.etherscan.io/address/0xff4A5b3FC9c55bB92c4f37b2193873C09B7Cacd3#code\n\n　実働時間：８時間（様々な調査や試行も含めて。）",
            "reward": 1330.8788139127669,
            "roles": "開発者",
            "timestamp": 1658484144,
            "contributor": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            "pollId": 1
        },
        {
            "contributionText": "チケット化されていなかったバグチケットを作成させていただきました\nhttps://trello.com/c/baYIl5x9",
            "reward": 689.4887543098212,
            "roles": "マーケター",
            "timestamp": 1658484144,
            "contributor": "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
            "pollId": 1
        },
        {
            "contributionText": "アプリ版のEnglister Diaryの実装を途中まで実施しました。\nアプリ下部のメニューに日記を追加と日記一覧画面への遷移＋右下のペンボタンから日記作成画面への遷移\nhttps://twitter.com/IT_KOTA3/status/1550662416270184449",
            "reward": 769.7408203841935,
            "roles": "開発者",
            "timestamp": 1658484144,
            "contributor": "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            "pollId": 1
        },
        {
            "contributionText": "① Learn to Earnの実装、及び出金依頼の運用を構築して、β版リリースしました\n画面: https://englister.yunomy.com/token\n出金の運用手順書: https://www.notion.so/2d804d4150554f81bebac62a3ec555a8\n\n② Englister DAOの「投票機能」「集計機能」のスマートコントラクトを実装をしました\n投票機能PR: https://github.com/KitaharaMugiro/englisterdao/pull/3\n集計機能PR: https://github.com/KitaharaMugiro/englisterdao/pull/5\n\n③ MZDAOに提案を作成しメールした\nhttps://docs.google.com/presentation/d/1X9WbK74eltaqbevluzYJg7-FgBqNNo8Iq6FDQ1Uoxys/edit#slide=id.p",
            "reward": 1428.2701547962802,
            "roles": "開発者",
            "timestamp": 1659693744,
            "contributor": "0x261f350466E17cbDf9Bc00E2B3875685EF9aB07C",
            "pollId": 2
        },
        {
            "contributionText": "① EnglisterDAOのソースレビューをしました。\nhttps://github.com/KitaharaMugiro/englisterdao/pull/2#issuecomment-1200094049\nhttps://github.com/KitaharaMugiro/englisterdao/pull/3#issuecomment-1200189928\nhttps://github.com/KitaharaMugiro/englisterdao/pull/4#issuecomment-1200103135\nhttps://github.com/KitaharaMugiro/englisterdao/pull/5#issuecomment-1200423848\nhttps://github.com/KitaharaMugiro/englisterdao/pull/6#issuecomment-1201249660\nhttps://github.com/KitaharaMugiro/englisterdao/pull/7#issuecomment-1203996961\n\n② UnitTestの追加実装をしました。\nhttps://github.com/KitaharaMugiro/englisterdao/pull/8",
            "reward": 898.5138082848403,
            "roles": "デザイナー",
            "timestamp": 1659693744,
            "contributor": "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
            "pollId": 2
        },
        {
            "contributionText": "① Englister DAOの「トレジャリー機能（換金機能）」のスマートコントラクトを実装をしました\nトレジャリー機能PR: https://github.com/KitaharaMugiro/englisterdao/pull/6",
            "reward": 1136.5170825996595,
            "roles": "マーケター",
            "timestamp": 1659693744,
            "contributor": "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
            "pollId": 2
        },
        {
            "contributionText": "Englisterで英語日記を書ける機能をアプリに実装しました\nhttps://twitter.com/IT_KOTA3/status/1555717203160633346\nhttps://github.com/KitaharaMugiro/englister/pull/29",
            "reward": 874.5764217146902,
            "roles": "プロダクトマネージャー",
            "timestamp": 1659693744,
            "contributor": "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
            "pollId": 2
        },
        {
            "contributionText": "現状のページフロー／構成をメンバー間での認識をあわせるため＆今後の改善検討をしやすくためにざっくりですがページ構成図を作ってみました。\n\nhttps://www.figma.com/file/BZQ56ZpdGGPkjqbtGaoah1lS/Englister%3A-Sitemap-and-UI?node-id=1%3A2",
            "reward": 662.1225326045302,
            "roles": "プロダクトマネージャー",
            "timestamp": 1659693744,
            "contributor": "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
            "pollId": 2
        },
        {
            "contributionText": "① DAOについての記事でEnglister DAOを宣伝し25000Viewを獲得。メンバーを増やしました\nhttps://qiita.com/yuno_miyako/items/1dff7b11e0d3f8fbb002\n\n② Englister DAOのフロントエンドを開発し、Englister DAOのブロックチェーン化を推進し、貢献しやすい環境を作っています。",
            "reward": 1259.6246373420765,
            "roles": "開発者",
            "timestamp": 1660903344,
            "contributor": "0x261f350466E17cbDf9Bc00E2B3875685EF9aB07C",
            "pollId": 3
        },
        {
            "contributionText": "① DAOTokenのテストコードの重複していた部分の削除を行いました。\nhttps://github.com/KitaharaMugiro/englisterdao/pull/14",
            "reward": 538.678776399921,
            "roles": "開発者",
            "timestamp": 1660903344,
            "contributor": "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
            "pollId": 3
        },
        {
            "contributionText": "① ソースコードを読む会を実施し、発表者をしました。\n(目的はEnglisterDAOを理解し、改良やメンテが行えるメンバを増やすためになります。)\nhttps://discord.com/channels/931274934997639258/985082918428868608/1005086091767988294\nhttps://discord.com/channels/931274934997639258/985082918428868608/1006128065157533719\nhttps://docs.google.com/document/d/1eromVQvVtkUmWQaUoGIjSmy5ngcmN0W6t58hX0hfcLo/edit?usp=sharing\n\n② ソースレビューを実施しました。\nhttps://github.com/KitaharaMugiro/englisterdao/pull/13#issuecomment-1214314563",
            "reward": 955.018525192086,
            "roles": "プロダクトマネージャー",
            "timestamp": 1660903344,
            "contributor": "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
            "pollId": 3
        },
        {
            "contributionText": "Product Roadmapを作る下準備として、まずプロダクトのVision/Missionを決める提案をしました（承認されました）\nhttps://docs.google.com/presentation/d/1Tl_tG92ST5oGW6U-XpzudUquMOA3L-NFWKZB0Enx9e8/edit?usp=sharing",
            "reward": 799.0097444820166,
            "roles": "開発者",
            "timestamp": 1660903344,
            "contributor": "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
            "pollId": 3
        },
        {
            "contributionText": "① 毎日4題解いて、Twitterで報告しました\nhttps://twitter.com/sasaki_dayo_202\n\n② Vision&Mission Draftを作成しました\nhttps://docs.google.com/presentation/d/1-PII63mUVzzAfkXXgLhXx3sPv4CQTXi-FeAf9oIzDzQ/edit",
            "reward": 649.6432134932163,
            "roles": "デザイナー",
            "timestamp": 1660903344,
            "contributor": "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
            "pollId": 3
        },
        {
            "contributionText": "①Twitterで英語年齢診断の結果やEnglisterについてツイートしてEnglisterを拡散しました。\nhttps://twitter.com/IT_KOTA3\n\n②アプリでログイン出来ない重大なエラーの調査をして対応方針を固めました。\n\n③EngliterのWeb版で英語日記を開発し始めました。\nhttps://github.com/KitaharaMugiro/deepl_english_learning/pull/38",
            "reward": 798.0251030906824,
            "roles": "マーケター",
            "timestamp": 1660903344,
            "contributor": "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
            "pollId": 3
        },
        {
            "contributionText": "① Englister Learn to Earnのリリース告知を、ツイートとメールで行い、ユーザの呼び込みと有料会員増に貢献しました。\n\n② Englister DAOのリファクタリングを実施しました\nhttps://github.com/KitaharaMugiro/englisterdao/pull/17\n\n③ Learn to Earnやスプレッドシート管理をしているトークンの仮想通貨化の設計・開発を行いました。\nhttps://github.com/KitaharaMugiro/englisterdao/pull/18\n\n④ Englister DAOの運営構築経験から有償のコンサル依頼を受け、その売上をDAOに提供しました。",
            "reward": 1644.5841534514302,
            "roles": "マーケター",
            "timestamp": 1662112944,
            "contributor": "0x261f350466E17cbDf9Bc00E2B3875685EF9aB07C",
            "pollId": 4
        },
        {
            "contributionText": "disordの#雑談にて議題に上がっていたmidjorneyの活用からインスピレーションを受け、より自由度の高いcraiyonを紹介しました。\nこれにより、今後englishrの新機能として英文から画像を生成する機能を活用した新たな英語学習法が産まれるかもしれません。",
            "reward": 325.6654672558563,
            "roles": "プロダクトマネージャー",
            "timestamp": 1662112944,
            "contributor": "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
            "pollId": 4
        },
        {
            "contributionText": "プロダクトロードマップ作成に向けて必要なVisionとMissionの素案を作成し提案、議論の末Visionは決定できました。\nhttps://docs.google.com/presentation/d/13PXX_jYoKaMBhtqkLP74qeLluBPwqA83JqjhVxHc4hQ/edit?usp=sharing",
            "reward": 987.5580083532029,
            "roles": "マーケター",
            "timestamp": 1662112944,
            "contributor": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "pollId": 4
        },
        {
            "contributionText": "①Englisterアプリの日記作成画面に猫のメッセージを追加しました。\nhttps://github.com/KitaharaMugiro/englister/pull/31",
            "reward": 482.1766810611204,
            "roles": "デザイナー",
            "timestamp": 1662112944,
            "contributor": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            "pollId": 4
        },
        {
            "contributionText": "①Web版の英語日記機能を開発し、ユーザから良い評判を得てプロダクトの価値向上に貢献しました。\nhttps://englister.yunomy.com/diary\nhttps://twitter.com/EnglisterApp/status/1565650791528280072/retweets/with_comments\n\n②Twitterで英語年齢診断の結果やEnglisterについてツイートしてEnglisterを拡散しました。\nhttps://twitter.com/IT_KOTA3",
            "reward": 1125.3218463458738,
            "roles": "マーケター",
            "timestamp": 1662112944,
            "contributor": "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
            "pollId": 4
        },
        {
            "contributionText": "① ほぼ毎日Englisterの結果をTwitterで報告ツイートして、Englisterを宣伝しています。\nhttps://mobile.twitter.com/sasaki_dayo_202",
            "reward": 434.6938435325162,
            "roles": "デザイナー",
            "timestamp": 1662112944,
            "contributor": "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            "pollId": 4
        },
        {
            "contributionText": "① NFT会員証の登録画面を作成しました\nhttps://englister.yunomy.com/payment/eternalPlan/pass\n\n② 最初から英語で入力するモードを追加し、より良い学習体験を追加しました。\nhttps://github.com/KitaharaMugiro/deepl_english_learning/pull/41\n\n③ モバイルアプリのログインできない問題を調査して解決させました。\n\n④ Englister DAOのフロントエンド周りを改善しました\nhttps://github.com/KitaharaMugiro/englisterdao/pull/22\n\n⑤ Englister DAOメンバーシップ証を実装しました\nhttps://github.com/KitaharaMugiro/englisterdao/pull/23",
            "reward": 1242.149805509095,
            "roles": "デザイナー",
            "timestamp": 1663408944,
            "contributor": "0x261f350466E17cbDf9Bc00E2B3875685EF9aB07C",
            "pollId": 5
        },
        {
            "contributionText": "NFT会員カードのラフ案を作成しました。また、会員カード作成の取りまとめを行い、実現に向けてかなり前進しました。",
            "reward": 720.0642332261681,
            "roles": "開発者",
            "timestamp": 1663408944,
            "contributor": "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
            "pollId": 5
        },
        {
            "contributionText": "①モバイルアプリのログイン出来ない問題を解決するために、エラー内容をDiscordへ送信可能にして、エラーの解決に貢献しました。\nhttps://github.com/KitaharaMugiro/englister/pull/32\n\n②iOSアプリの規制でユーザ削除機能が必須となったため、モバイルアプリにユーザ削除のリンクを設置して、アプリの審査を通すことに成功しました。\nhttps://github.com/KitaharaMugiro/englister/pull/34/\n\n③Englister Diaryの結果画面を改善してより使いやすいものにしました。\nhttps://github.com/KitaharaMugiro/deepl_english_learning/pull/42\n\n④モバイルアプリの英語日記のコードのレビューをしました。\nhttps://github.com/KitaharaMugiro/englister/pull/35",
            "reward": 1078.947913632067,
            "roles": "開発者",
            "timestamp": 1663408944,
            "contributor": "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
            "pollId": 5
        },
        {
            "contributionText": "ソースコードを読む会を実施し、発表者をしました。\nhttps://discord.com/channels/931274934997639258/1011539742967463997/1015238669965205566\nhttps://docs.google.com/document/d/1bvWXLwAe4MrREEm5P_ZEuDCBhN8j2ev8yEsUi15YDv8/edit?usp=sharing",
            "reward": 630.8185918851631,
            "roles": "開発者",
            "timestamp": 1663408944,
            "contributor": "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
            "pollId": 5
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
        }]
    const contributors = data.map(d => d.contributor)
    const uniqueContributors = [...new Set(contributors)]

    function createRandomScore() {
        //スコアは少数がつけられないことに注意
        return BigNumber.from(Math.floor(Math.random() * 10));
    }


    for (let i = 0; i < 200; i++) {
        const randomContributor = uniqueContributors[Math.floor(Math.random() * uniqueContributors.length)]
        const randomVoter = uniqueContributors[Math.floor(Math.random() * uniqueContributors.length)]
        const randomComment = "コメント" + i
        const assessment: AssessmentStruct = {
            voter: randomVoter,
            contributor: randomContributor,
            points: [createRandomScore(), createRandomScore(), createRandomScore()],
            comment: randomComment,
            perspectiveId: BigNumber.from(1),
            pollId: BigNumber.from(Math.floor(Math.random() * 6)),
        }
        await daoHistory.addAssessment("demo", "season1", [assessment])
    }

}

