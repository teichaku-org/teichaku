import { DAOHistory } from "./DAOHistory"
import { Poll } from "./Poll"

export class DAOLauncher {
  async createDao(
    daoId: string,
    projectId: string,
    name: string,
    description: string,
    website: string,
    logo: string,
    _tokenAddress: string,
    _contributorToken: number,
    _voterToken: number,
    _votingDuration: number,
    isWeb3: boolean
  ) {
    const daoHistory = new DAOHistory("")

    await daoHistory.addDao(daoId, projectId, name, description, website, logo)

    const poll = new Poll(daoId, projectId)
    poll.setAssignmentToken(_contributorToken, _voterToken)
    poll.setVotingDuration(0, _votingDuration)
  }
}
