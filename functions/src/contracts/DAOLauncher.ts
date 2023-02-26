import { DAOHistory } from "./DAOHistory"
import { Poll } from "./Poll"

export class DAOLauncher {
  sender: string
  constructor(sender: string) {
    this.sender = sender
  }

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
    _votingDuration: number
  ) {
    const daoHistory = new DAOHistory("", this.sender)

    await daoHistory.addDao(daoId, projectId, name, description, website, logo)

    const poll = new Poll(daoId, projectId, this.sender)
    poll.setAssignmentToken(_contributorToken, _voterToken)
    poll.setVotingDuration(0, _votingDuration)
  }
}
