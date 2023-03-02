export const en = {
  Overview: {
    Title: "DAO Overview",
    SubTitle: "The Details of DAO and its Token",
    OrganizationCard: {
      Contributions: "Contributions",
      Contributors: "Contributors",
      Reviewer: "Reviewer",
    },
    TokenInfoCard: {
      RewardsToken: "Reward Token",
      ContractAddress: " Contract Address",
      TokenName: "Token Name",
      TokenSymbol: "Token Symbol",
      TotalSupply: "Total Supply",
      TreasuryBalance: "Treasury Balance",
      TotalDistributionsPerSprint: "Total Distributions Per Sprint",
      Contributor: "Contributor",
      Reviewer: "Reviewer",
      Commission: "Commission",
    },
  },
  LP: {
    HeroText1: "New DAO Framework to ",
    HeroText2Colorful: "Make a Lasting Impact",
    HeroText3: " and Retain members.",
    HeroSubText: "Fully on-chain and decentrized DAO Framework that are friendly to Agile development.",
    Problems: {
      Title: "Problems of DAO and Our Solutions",
      Onboarding: {
        Title: "Newcomers don't have idea what the DAO are doing?",
        SolutionTitle:
          "All Contributions that DAO members have made so far is recorded and helps newcomers to understand DAO.",
        SolutionName: "The history of DAO is recorded on blockchain.",
      },
      Hurdle: {
        Title: "The hurdle to get rewards is too high!",
        SolutionTitle: "Any contribution is fine, just give it a try and everyone will evaluate it.",
        SolutionName: "You can register your contributions without permission!",
      },
      Reward: {
        Title: "Unclear benefits of participation",
        SolutionTitle:
          "The evaluation will be the token reward directly as it is. And evaluations and comments on your contributions are recorded on blockchain and can be exported as NFT.",
        SolutionName: "Token and NFT are issued for your contribution.",
      },
    },
  },
  Button: {
    Demo: "Demo",
    CreateYourDAO: "Create Your DAO",
    StartFromHere: "Start From Here",
    SortBy: "Sort by",
    FilterByRole: "Filter by role",
    MintNFT: "Mint NFT",
    AppMenu: "menu",
    Follow: "Follow",
    Unfollow: "Unfollow",
    ConnectWallet: "Connect Wallet",
    SaveDraft: "Save Draft",
    SubmitToBlockchain: "Submit to Blockchain",
    SubmitToDatabase: "Submit to Database",
    WaitToVote: (date: Date) => `Wait Until ${date.toLocaleDateString()}`,
    AddYourContribution: "Add Your Contribution",
    UpdateYourContribution: "Update Your Contribution",
    SettlePollForAdmin: "Settle Poll(Only Admin Can)",
    SettlePoll: "Settle Poll",
    ChangeNetwork: (network: string) => `Change Network to ${network}`,
    Update: "Update",
    Add: "Add",
    Web3Migration: "Web3 Migration",
  },
  Common: {
    NodataMessage: {
      Title: "Let's Start Contributing!",
      Invite: {
        Title: "Let's Invite Members",
        Description: (vision: string) =>
          `Copy the url and share it with the members you want to invite to the DAO that does the ${vision}!`,
      },
    },
    AppMenu: {
      Info: "Info",
      Events: "Events",
      Admin: "Admin",
      Overviews: "Overviews",
      History: "History",
      Contribution: "Contribution",
      SprintReview: "SprintReview",
      Assessments: "Assessments",
      Settings: "Settings",
      Logout: "Logout",
    },
    NetworkCheck: {
      Title: "The currently connected network is not supported.",
      Text: (name: string, network: string) => `${name} is running on ${network}!`,
    },
  },
  History: {
    Title: (daoname: string) => `The History of ${daoname}`,
    SubTitle: (daoname: string) => `A list of contributions of the ${daoname} memebers`,
    HistoryList: {
      Contributions: "Contributions",
      NothingFound: "Nothing found",
    },
    SortKeys: {
      Newest: "Newest",
      Oldest: "Oldest",
      Largest: "Largest",
      Smallest: "Smallest",
    },
  },
  Assessment: {
    Title: "Your Assessments",
    AssessmentTabs: {
      NotConnectWallet: "You don't connect metamask yet. Connect wallet from right top button.",
      Total: "Total",
      Individual: "Individual",
      TotalTab: {
        TotalRewardTitle: "Total Reward",
        ComparedPreviousReward: "Compared to previous reward",
        CumulativeRewardTitle: "Cumulative Reward",
        AverageAssessmentTitle: "Average Assessment",
        RewardHistoryTitle: "Reward History",
      },
    },
    SingleAssessment: {
      EarnedTokens: "Earned tokens",
      Assessments: "Assessments",
      Contribution: "Contribution",
      Evidences: "Evidences",
      ReviewersAndComments: "Reviewers and Comments",
    },
  },
  Contribution: {
    Title: "Explain Your Contribution!",
    PollEndInfo: {
      LeftTimeText: "The current SprintReview end in",
    },
    ContributionCard: {
      Notification: {
        Title: "Your Contribution is sent to blockchain!",
        Message: "Please wait for the transaction to be completed.",
      },
      NotificationWeb2: {
        Title: "Your Contribution is sent to database",
        Message: "Please wait for the transaction to be completed.",
      },
      Contribution: {
        Label: "Your contribution",
        Placeholder: "What did you do for the DAO?",
      },
      Evidence: {
        Label: (num: number) => `Evidence Url ${num}`,
      },
      Role: {
        Label: "Your Roles",
        Placeholder: "Type your role",
        CreateLabel: (query: string) => `+ Create ${query}`,
      },
      ContributionExamples: {
        Title: "Pick Your Contributions!",
        Development: {
          Title: "💻　Development",
          Description: "I developed a new feature for the DAO.",
        },
        Design: {
          Title: "🎨　Design",
          Description: "I designed a new feature for the DAO.",
        },
        Translation: {
          Title: "🌍　Translation",
          Description: "I translated the DAO's website into Japanese.",
        },
        Documentation: {
          Title: "📝　Documentation",
          Description: "I wrote a new documentation for the DAO.",
        },
        Writing: {
          Title: "✍️　Writing",
          Description: "I wrote a new article for the DAO.",
        },
        Marketing: {
          Title: "📢　Marketing",
          Description: "I promoted the DAO on Twitter.",
        },
        Community: {
          Title: "👥　Community",
          Description: "I answered a question on Discord.",
        },
        Research: {
          Title: "🔬　Research",
          Description: "I researched a new feature for the DAO.",
        },
        Operation: {
          Title: "🔧　Operation",
          Description: "I operated the DAO's website.",
        },
        DataAnalysis: {
          Title: "📊　Data Analysis",
          Description: "I analyzed the DAO's data.",
        },
        Anything: {
          Title: "🤷　Anything",
          Description: "I did anything for the DAO.",
        },
      },
    },
  },
  Poll: {
    Title: "SprintReview",
    CurrentReviewerIncentive: "Current Reviewer Incentive:",
    PollIsEnded: "The current SprintReview is ended.",
    ConfirmNoVoter:
      "No one has voted yet. If there are no reviewers, no tokens will be distributed and voting will be initialized.",
    PollSystem: {
      AlreadyVoteMessage: "You already voted but you can vote for revision",
      Notification: {
        Title: "Your Vote is sent to blockchain!",
        Message: "Please wait for the transaction to be completed.",
      },
      NotificationWeb2: {
        Title: "Your Vote is sent to database!",
        Message: "Please wait for the transaction to be completed.",
      },
      Settle: {
        Title: "Your transaction is sent to blockchain!",
        Message: "Please wait for the transaction to be completed.",
      },
      SettleWeb2: {
        Title: "Your transaction is sent to database!",
        Message: "Please wait for the transaction to be completed.",
      },
      CandidateCard: {
        Comment: {
          Label: "comment (optional)",
          Placeholder: "Your comment",
        },
        AlertVoteMyself: "This is your contribution, so you can't vote for yourself",
      },
    },
  },
  CreateDao: {
    Step1: {
      Title: "Claim a name",
      SubTitle: "Claim a name for your DAO",
      URLPreview: "URL Preview: ",
      DAOName: "DAO's name",
      DAOVision: "DAO's vision",
      DAONamePlaceholder: "Type your DAO's name",
      Duplicate: "This name is already taken",
      DAOVisionPlaceholder: "Type your DAO's vision",
      LogoUrl: "Logo URL",
      LogoUrlPlaceholder: "https://...",
      FirstProjectName: "First project's name",
      FirstProjectNamePlaceholder: "Type your first project's name",
      FirstProjectNameDefault: "season1",
    },
    Step2: {
      Title: "Configure template",
      SubTitle: "Rewards and Sprint Duration",
      NotSet: "Not set",
      InvalidTokenAddress: "Invalid token address",
      NoTokenSymbol: "We can't get token symbol. It might not be a token address",
    },
    Step3: {
      Title: "Review Information",
      SubTitle: "Have one last look",
      Setting: "Setting",
      Value: "Value",
      ProjectUrl: "Project URL",
      ContributorReward: "Contributor Reward",
      ReviewerReward: "Reviewer Reward",
    },
    Complete: {
      Wait: "Click below button to confirm the transaction!",
      AcceptTransaction: "Accept Transaction",
      Retry: "Retry",
      Notification: {
        Title: "Your DAO is sent to blockchain!",
        Message: "Please wait for the transaction to be completed.(About 1 minute)",
      },
    },
    CompleteWeb2: {
      Wait: "Click below button to create the DAO！",
      AcceptTransaction: "Create the DAO",
      Retry: "Retry",
      Notification: {
        Title: "Your DAO is sent to database!",
        Message: "Please wait for the transaction to be completed.",
      },
    },
  },
  Settings: {
    Title: "Settings",
    SubTitle: "Setting is being built now! Most features still don't work.",
    Notification: {
      Title: "Your setting is sent to blockchain!",
      Message: "Please wait for the transaction to be completed.",
    },
    NotificationWeb2: {
      Title: "Your setting is sent to database!",
      Message: "Please wait for the transaction to be completed.",
    },
    TokenSetting: {
      TokenDistribution: "Token for Reward",
      CurrentTokenSymbol: "Current Token Symbol:",
      AddressInput: {
        Label: "ERC20 Token Address",
      },
    },
    TreasurySetting: {
      Title: "Treasury Balance",
      SendTokenInput: {
        Label: "Send Tokens to Treasury",
        Placeholder: "Specify the amount of tokens you want to transfer",
      },
      TokenIsShortTitle: "Not enough tokens to distribute",
      TokenIsShortDescription: (token: number) =>
        `A minimum of ${token} tokens is required to close the vote. Please add more tokens and close the vote again.`,
    },
    DistributionSetting: {
      Title: "Total Reward Per Sprint",
      Contributor: {
        Label: "Contributor Distribution",
      },
      Reviewer: {
        Label: "Reviewer Distribution",
      },
    },
    PollPerspectiveSetting: {
      Title: "Poll Perspectives",
      Perspective: {
        Label: (num: number) => `Perspective ${num}`,
        InitialValues: {
          Perspective1: "quality",
          Perspective2: "quantity",
          Perspective3: "effectiveness",
        },
      },
    },
    PollDeadlineSetting: {
      Title: "Sprint Duration",
      DatePicker: {
        Placeholder: "Pick date",
        Label: "Sprint Start Date",
      },
      PollDeadline: {
        Label: "Sprint End Date",
      },
    },
    PollDuration: {
      Title: "Poll Duration",
      Days: "Type 1-30 days",
      DayUnit: "days",
    },
    SBTSetting: {
      Title: "SBT For Review",
      SBTAddressInput: {
        Label: "SBT Address",
      },
    },
  },
  Migration: {
    Title: "Web3 Migration",
  },
  TokenReceiveModal: {
    Title: "This DAO is migrated to Web3!",
    Description: "Please install Metamask to receive tokens.",
  },
  Alert: {
    PleaseInstallMetamask: "Please install Metamask",
  },
}
