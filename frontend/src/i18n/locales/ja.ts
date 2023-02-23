export const ja = {
  Overview: {
    Title: "DAOの概要",
    SubTitle: "DAOの詳細とトークンについて",
    OrganizationCard: {
      Contributions: "貢献",
      Contributors: "貢献者",
      Reviewer: "レビュアー",
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
      Commission: "手数料",
    },
  },
  LP: {
    HeroText1: "メンバーを定着させて",
    HeroText2Colorful: "継続的なインパクトを生み出す",
    HeroText3: "ための新しいDAOフレームワーク。",
    HeroSubText:
      "フルオンチェーンで分散化されたDAOフレームワーク。アジャイル型組織に適しています。",
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
        SolutionTitle:
          "どんな貢献でも構いませんし許可も不要です。レビュワーがあなたの貢献を評価して報酬を決めます。",
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
    SubmitToBlockchain: "ブロックチェーンに登録",
    WaitToVote: (date: Date) => `${date.toLocaleDateString()}から投票可能`,
    AddYourContribution: "自分の貢献を追加する",
    UpdateYourContribution: "自分の貢献を更新する",
    SettlePollForAdmin: "投票を締め切る(管理者用)",
    SettlePoll: "投票を締め切る",
    ChangeNetwork: (network: string) => `ネットワークを${network}へ変更する`,
    Update: "更新",
    Add: "追加",
    Web3Migration: "Web3移行",
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
      Logout: "ログアウト",
    },
    NetworkCheck: {
      Title: "現在接続されているネットワークはサポートされていません。",
      Text: (name: string, network: string) =>
        `${name} は ${network}で動いています!`,
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
      NotConnectWallet:
        "メタマスクとまだ接続できていません。 右上のウォレット接続ボタンから接続をお願いします。",
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
        Development: {
          Title: "💻　開発",
          Description: "...を新しく開発しました。",
        },
        Design: {
          Title: "🎨　デザイン",
          Description: "...をデザインしました。",
        },
        Translation: {
          Title: "🌐　翻訳",
          Description: "...を翻訳しました。",
        },
        Documentation: {
          Title: "📝　ドキュメント",
          Description: "...についての新しいドキュメントを作成しました。",
        },
        Writing: {
          Title: "✍️　執筆",
          Description: "...についての記事を作成しました。",
        },
        Marketing: {
          Title: "📢　マーケティング",
          Description: "...をマーケティングしました。",
        },
        Community: {
          Title: "👥　コミュニティ",
          Description: "...でコミニティ運営に貢献しました。",
        },
        Research: {
          Title: "🔬　研究",
          Description: "...について調査しました。",
        },
        Operation: {
          Title: "🔧　運用",
          Description: "...を運営しました。",
        },
        DataAnalysis: {
          Title: "📊　データ分析",
          Description: "...を分析しました。",
        },
        Anything: {
          Title: "🤷　その他(なんでも)",
          Description: "...を行いました。",
        },
      },
    },
  },
  Poll: {
    Title: "スプリントレビュー",
    CurrentReviewerIncentive: "現在レビュアーが獲得できるトークン:",
    PollIsEnded: "スプリントレビューは終了しました。",
    ConfirmNoVoter:
      "まだ誰も投票していません。レビュワーがいない場合はトークンは分配されず、投票が初期化されます。",
    PollSystem: {
      AlreadyVoteMessage: "既に投票をしていますが、投票を修正できます。",
      Notification: {
        Title: "投票がブロックチェーンに送信されました!",
        Message: "トランザクション完了までお待ちください。",
      },
      Settle: {
        Title: "あなたのトランザクションはブロックチェーンに送信されました！",
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
  CreateDao: {
    Step1: {
      Title: "名前を決める",
      SubTitle: "DAOの名前や説明を決める",
      URLPreview: "URLプレビュー: ",
      DAOName: "DAOの名前",
      DAODescription: "DAOの説明",
      DAONamePlaceholder: "DAOの名前を入力してください",
      Duplicate: "この名前は既に使われています。",
      DAODescriptionPlaceholder: "DAOの説明を入力してください",
      LogoUrl: "ロゴのURL",
      LogoUrlPlaceholder: "https://...",
      FirstProjectName: "最初のプロジェクトの名前",
      FirstProjectNamePlaceholder: "最初のプロジェクトの名前を入力してください",
      FirstProjectNameDefault: "season1",
    },
    Step2: {
      Title: "設定する",
      SubTitle: "報酬とスプリントの長さを設定",
      NotSet: "未設定",
      InvalidTokenAddress: "無効なトークンアドレスです。",
      NoTokenSymbol:
        "シンボルを取得できませんでした。トークンのアドレスではないかもしれません。",
    },
    Step3: {
      Title: "確認",
      SubTitle: "DAOの設定を確認",
      Setting: "設定",
      Value: "値",
      ProjectUrl: "プロジェクトのURL",
      ContributorReward: "コントリビューターの報酬",
      ReviewerReward: "レビュアーの報酬",
    },
    Complete: {
      Wait: "以下のボタンを押すとトランザクションが承認され、ブロックチェーンにDAOが書き込まれます！",
      AcceptTransaction: "トランザクションを承認",
      Retry: "リトライ",
      Notification: {
        Title: "DAOがブロックチェーンに送信されました!",
        Message: "トランザクション完了までお待ちください。",
      },
    },
    CompleteWeb2: {
      Wait: "以下のボタンを押すとDAOが立ち上げられます！",
      AcceptTransaction: "DAOを立ち上げる",
      Retry: "リトライ",
      Notification: {
        Title: "DAOが立ち上げられました!",
        Message: "DAOが立ち上げられるまでお待ちください。",
      },
    },
  },
  Settings: {
    Title: "設定",
    SubTitle: "設定は現在開発中です! ほとんどの機能はまだ動作しません。",
    Notification: {
      Title: "設定がブロックチェーンに送信されました!",
      Message: "トランザクション完了までお待ちください。",
    },
    TokenSetting: {
      TokenDistribution: "報酬に用いるトークン",
      CurrentTokenSymbol: "現在のトークンシンボル:",
      AddressInput: {
        Label: "ERC20 トークンアドレス",
      },
    },
    TreasurySetting: {
      Title: "トレジャリー残高",
      SendTokenInput: {
        Label: "トレジャリーにトークンを追加",
        Placeholder: "追加するトークンの量を指定します",
      },
      TokenIsShortTitle: "分配するトークンが不足しています",
      TokenIsShortDescription: (token: number) =>
        `投票を締め切るには最低でも${token}トークンが必要です。トークンを追加して再度投票の締め切りを行ってください。`,
    },
    DistributionSetting: {
      Title: "1スプリントあたりのトークン分配",
      Contributor: {
        Label: "貢献者への分配",
      },
      Reviewer: {
        Label: "レビュアーへの分配",
      },
    },
    PollPerspectiveSetting: {
      Title: "投票時の評価観点",
      Perspective: {
        Label: (num: number) => `評価観点 ${num}`,
        InitialValues: {
          Perspective1: "質",
          Perspective2: "量",
          Perspective3: "有効性",
        },
      },
    },
    PollDeadlineSetting: {
      Title: "スプリント期間",
      DatePicker: {
        Placeholder: "日付を選択",
        Label: "スプリント開始日",
      },
      PollDeadline: {
        Label: "Sprint End Date",
      },
    },
    PollDuration: {
      Title: "スプリントの長さ",
      Days: "1-30の日数を選択",
      DayUnit: "日",
    },
    SBTSetting: {
      Title: "レビューに必要なSBT",
      SBTAddressInput: {
        Label: "SBT アドレス",
      },
    },
  },
  Migration: {
    Title: "Web3へ移行する",
  },
  TokenReceiveModal: {
    Title: "このDAOはWeb3に移行しました",
    Description: "Metamaskと連携してトークンを受け取りましょう"
  },
  Alert: {
    PleaseInstallMetamask: "Metamaskをインストールしてください",
  }
};
