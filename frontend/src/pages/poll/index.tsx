import { PollSystem } from "@/components/poll/PollSystem"
import usePoll from "@/hooks/dao/usePoll"
import { Container, Text } from "@mantine/core"

const Poll = () => {
    const { pollDetail, voterReward, contributorReward, vote, candidateToPoll } = usePoll()

    if (!pollDetail) return <div>Loading</div>
    const voters = pollDetail.voters
    const candidates = pollDetail.contributions
    const timestamp = pollDetail.timestamp

    const _vote = async (points: number[][], comments: string[]) => {
        const candidates = pollDetail.contributions.map((c) => c.contributor)
        console.log({ points, comments, candidates })
        await vote(pollDetail.pollId, candidates, points, comments)
    }

    const _candidateToPoll = async (contributionText: string, evidences: string[], roles: string[]) => {
        await candidateToPoll(contributionText, evidences, roles)
    }

    //TODO: NFTを持っている場合のみ投票できるようにする
    return <Container >
        <h1>Accepting your votes now!</h1>
        <Text mb="lg">Evaluate the contributions achieved by DAO members this week.
            You'll gain preliminary {voterReward / voters.length} Coins just by voting! </Text>


        <PollSystem
            candidates={candidates}
            alreadyVoted={pollDetail.alreadyVoted}
            contributorReward={contributorReward}
            vote={_vote}
            perspectives={pollDetail.perspectives}
            candidateToPoll={_candidateToPoll}
        />

    </Container>
}
export default Poll