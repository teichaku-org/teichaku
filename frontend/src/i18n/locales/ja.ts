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
    SaveDraft: "下書き保存",
    SubmitToBlockchain: "ブロックチェーンに送信",
    AddYourContribution: "自分の貢献を追加する",
    UpdateYourContribution: "自分の貢献を更新する",
    SettlePoll: "投票を締め切る(管理者用)",
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
    Title: "自分の評価",
    AssessmentTabs: {
      NotConnectWallet: "メタマスクとまだ接続できていません。 右上のウォレット接続ボタンから接続をお願いします。",
      Total: "集計",
      Individual: "個別",
      TotalTab: {
        TotalRewardTitle: "合計報酬",
        ComparedPreviousReward: "前回の報酬との比較",
        CumulativeRewardTitle: "累積報酬",
        AverageAssessmentTitle: "平均評価",
        RewardHistoryTitle: "報酬履歴",
      },
    },
    SingleAssessment: {
      EarnedTokens: "獲得トークン",
      Assessments: "評価",
      Contribution: "貢献内容",
      Evidences: "エビデンス",
      ReviewersAndComments: "レビュアーとコメント",
    },
  },
  Contribution: {
    Title: "あなたの貢献を登録しよう!",
    PollEndInfo: {
      LeftTimeText: "現在のスプリントレビュー終了まで",
    },
    ContributionCard: {
      Notification: {
        Title: "貢献内容がブロックチェーンに送信されました！",
        Message: "トランザクション完了までお待ちください。",
      },
      Contribution: {
        Label: "貢献内容",
        Placeholder: "DAOのために何をしましたか？",
      },
      Evidence: {
        Label: (num: number) => `エビデンス Url ${num}`,
      },
      Role: {
        Label: "ロール",
        Placeholder: "ロールを選択してください",
        CreateLabel: (query: string) => `+ ${query}を作成する`,
      },
      ContributionExamples: {
        Title: "貢献を選択しよう!",
        Documentation: {
          Title: "ドキュメント整理",
          Description: "...についての新しいドキュメントを作成しました。",
        },
        BugFix: {
          Title: "バグ修正",
          Description: "...のバグを修正しました。",
        },
        Advertisement: {
          Title: "広告宣伝",
          Description: "...を宣伝しました。",
        },
        Development: {
          Title: "開発",
          Description: "...を新しく開発しました。",
        },
        Design: {
          Title: "デザイン",
          Description: "を新しくデザインしました。",
        },
        Analysis: {
          Title: "分析",
          Description: "...を分析しました。",
        },
        Anything: {
          Title: "なんでも!!",
          Description: "...を行いました。",
        },
      },
    },
  },
  Poll: {
    Title: "スプリントレビュー",
    CurrentReviewerIncentive: "現在レビュアーが獲得できるトークン:",
    PollSystem: {
      AlreadyVoteMessage: "既に投票をしていますが、投票を修正できます。",
      Notification: {
        Title: "投票がブロックチェーンに送信されました!",
        Message: "トランザクション完了までお待ちください。",
      },
      CandidateCard: {
        SelectPoint: {
          Placeholder: "１つ選択",
        },
        Comment: {
          Label: "コメント (任意)",
          Placeholder: "あなたのコメント",
        },
        AlertVoteMyself: "自分の貢献には投票できません。",
      },
    },
  },
};
