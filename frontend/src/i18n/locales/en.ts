export const en = {
  Overview: {
    Title: "DAO Overview",
    SubTitle: "The Details of DAO and its Token",
    OrganizationCard: {
      Contributions: "Contributions",
      Contributors: "Contributors",
      Voters: "Voters",
    },
    TokenInfoCard: {
      RewardsToken: "Rewards Token",
      ContractAddress: " Contract Address",
      TokenName: "Token Name",
      TokenSymbol: "Token Symbol",
      TotalSupply: "Total Supply",
      TreasuryBalance: "Treasury Balance",
      TotalDistributionsPerSprint: "Total Distributions Per Sprint",
      Contributor: "Contributor",
      Reviewer: "Reviewer",
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
  },
  Common: {
    NodataMessage: {
      Title: "Let's Start Contributing!",
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
    SingleAssessment: {
      EarnedTokens: "Earned tokens",
      Assessments: "Assessments",
      Contribution: "Contribution",
      Evidences: "Evidences",
      ReviewersAndComments: "Reviewers and Comments",
    },
  },
};
