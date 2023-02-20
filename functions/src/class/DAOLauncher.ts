import { DAOHistory } from "./DAOHistory";

export class DAOLauncher {
  async createDao(
    daoId: string,
    projectId: string,
    name: string,
    description: string,
    website: string,
    logo: string,
    tokenAddress: string,
    contributorToken: number,
    voterToken: number,
    votingDuration: number,
    isWeb3: boolean
  ) {
    // IDAOHistory
    //  addDao
    // Poll

    const daoHistory = new DAOHistory();

    await daoHistory.addDao(
      daoId,
      projectId,
      name,
      description,
      website,
      logo,
      isWeb3
    );

    // IPoll poll = IPoll(pollAddress);
    // poll.setAssignmentToken(_contributorToken, _voterToken);
    // poll.setTokenAddress(_tokenAddress, address(0));
    // poll.setVotingDuration(0, _votingDuration);
  }
}
