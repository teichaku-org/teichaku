export type useDaoLauncherInterface = () => {
    createDao: (daoId: string, projectId: string, daoName: string, daoDescription: string, website: string, logo: string, tokenAddress: string, contributorReward: number, reviewerReward: number, votingDurattion: number) => Promise<void>
}