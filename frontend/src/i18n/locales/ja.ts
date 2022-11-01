export const ja = {
  Overview: {
    Title: "DAOの概要",
    SubTitle: "DAOの詳細とトークンについて",
    OrganizationCard: {
      Contributions: "貢献",
      Contributors: "貢献者",
      Voters: "投票者",
    },
    TokenInfoCard: {
      RewardsToken: "トークンについて",
      ContractAddress: "コントラクトアドレス",
      TokenName: "トークン名",
      TokenSymbol: "トークンシンボル",
      TotalSupply: "合計発行数",
      TreasuryBalance: "トレジャリー残高",
      TotalDistributionsPerSprint: "スプリントごとのトークン分配割合",
      Contributor: "貢献者",
      Reviewer: "レビュアー",
    },
  },
  LP: {
    HeroText1: "メンバーを定着させて",
    HeroText2Colorful: "継続的なインパクトを生み出す",
    HeroText3: "ための新しいDAOフレームワーク。",
    HeroSubText: "フルオンチェーンで分散化されたDAOフレームワーク。アジャイル型組織に適しています。",
    Problems: {
      Title: "DAOの問題点とTeichakuの解決策",
      Onboarding: {
        Title: "新しく入ってきた人には、DAOが何をしているかわからない",
        SolutionTitle:
          "DAOメンバーが過去に行ったすべての貢献が記録され、新しく入ってきた人がDAOを理解するのに役立ちます。",
        SolutionName: "DAOのヒストリーをブロックチェーンに",
      },
      Hurdle: {
        Title: "報酬を得るためのハードルが高すぎる！",
        SolutionTitle: "どんな貢献でも構いませんし許可も不要です。レビュワーがあなたの貢献を評価して報酬を決めます。",
        SolutionName: "簡単でパーミッションレス",
      },
      Reward: {
        Title: "参加するメリットが不明瞭",
        SolutionTitle:
          "評価が直接トークンとして報酬となります。貢献に対する評価とコメントはブロックチェーンに記録され、NFTとしてエクスポートできます!",
        SolutionName: "貢献に対するトークンとNFT",
      },
    },
  },
  Button: {
    Demo: "デモ",
    CreateYourDAO: "新しくDAOを作成",
    StartFromHere: "ここから始めよう",
    SortBy: "並び替え",
    FilterByRole: "ロールで絞り込む",
    MintNFT: "NFTにする",
    AppMenu: "メニュー",
    Follow: "フォローする",
    Unfollow: "フォローを解除",
    ConnectWallet: "ウォレットを接続",
  },
  Common: {
    NodataMessage: {
      Title: "貢献を始めましょう!",
    },
    AppMenu: {
      Info: "情報",
      Events: "イベント",
      Admin: "管理",
      Overviews: "概要",
      History: "ヒストリー",
      Contribution: "貢献登録",
      SprintReview: "スプリントレビュー",
      Assessments: "評価",
      Settings: "設定",
    },
  },
  History: {
    Title: (daoname: string) => `${daoname}のヒストリー`,
    SubTitle: (daoname: string) => `${daoname}メンバーの貢献一覧`,
    HistoryList: {
      Contributions: "貢献",
      NothingFound: "貢献が見つかりませんでした。",
    },
    SortKeys: {
      Newest: "最新順",
      Oldest: "古い順",
      Largest: "大きな貢献順",
      Smallest: "小さな貢献順",
    },
  },
  Assessment: {
    SingleAssessment: {
      EarnedTokens: "獲得トークン",
      Assessments: "評価",
      Contribution: "貢献内容",
      Evidences: "エビデンス",
      ReviewersAndComments: "レビュアーとコメント",
    },
  },
};
