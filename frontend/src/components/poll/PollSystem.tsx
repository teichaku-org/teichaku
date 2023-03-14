import { Contribution } from "@/domains/Contribution"
import useWeb3Auth from "@/hooks/web3/useWeb3Auth"
import { useLocale } from "@/i18n/useLocale"
import { calculateTheTimeToVote } from "@/utils/theTimeToVote"
import { Alert, Button, Group, Space, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { Container } from "@nivo/core"
import { IconAlertCircle } from "@tabler/icons"
import { useEffect, useState } from "react"
import { AddYourContribution } from "./AddYourContribution"
import { CandidateCard } from "./CandidateCard"

interface Props {
  candidates: Contribution[]
  alreadyVoted: boolean
  contributorReward: number
  vote: (points: number[][], comments: string[]) => void
  candidateToPoll: (contributionText: string, evidences: string[], roles: string[]) => void
  perspectives: string[]
  isAdmin: boolean
  tokenSymbol: string
  settle: () => void
  endDate: Date
  isWeb3: boolean
  pollId: number
}

type PointObject = {
  [key: string]: number[]
}

type CommentObject = {
  [key: string]: string
}

type Poll = {
  points: PointObject
  comments: CommentObject
}

type PollObject = {
  [key: number]: Poll
}

export const PollSystem = (props: Props) => {
  const { t } = useLocale()
  const { AlreadyVoteMessage } = t.Poll.PollSystem
  const { address } = useWeb3Auth()
  const [pointObject, setPointObject] = useState<PointObject>({})
  const [commentObject, setCommentObject] = useState<CommentObject>({})
  const [distributionObject, setDistributionObject] = useState<{ [key: string]: number }>({})
  const theTimeCanVote = calculateTheTimeToVote(props.endDate)
  const isTheTimeCanVote = theTimeCanVote < new Date()

  //smarller than md
  const theme = useMantineTheme()
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)
  useEffect(() => {
    loadLocalStorage()
  }, [])

  useEffect(() => {
    //集計処理
    const points = props.candidates.map((candidate) => {
      const points = pointObject[candidate.contributor]
      if (!points) return 0
      return points.reduce((a, b) => a + b, 0)
    })
    const total = points.reduce((a, b) => a + b, 0)
    const distribution = points.map((point) => {
      if (total === 0) return 0
      return (point / total) * props.contributorReward
    })
    const distributionObject = props.candidates.reduce((obj, candidate, index) => {
      obj[candidate.contributor] = Math.round(distribution[index])
      return obj
    }, {} as { [key: string]: number })
    setDistributionObject(distributionObject)
  }, [pointObject])

  useEffect(() => {
    //自動でローカルストレージに保存
    let pollObject: PollObject = {
      [props.pollId]: {
        points: pointObject,
        comments: commentObject,
      },
    }
    if (Object.keys(pointObject).length || Object.keys(commentObject).length) {
      localStorage.setItem("poll", JSON.stringify(pollObject))
    }
  }, [pointObject, commentObject])

  const loadLocalStorage = () => {
    const poll = localStorage.getItem("poll")
    if (poll) {
      let pollObject: PollObject = JSON.parse(poll)
      for (const key in pollObject) {
        if (Number(key) == props.pollId) {
          setPointObject(pollObject[key].points)
          setCommentObject(pollObject[key].comments)
        } else {
          localStorage.removeItem("poll")
        }
      }
    }
  }

  const _vote = async () => {
    const defaultPoints = props.perspectives.map(() => 0)
    const points = props.candidates.map((c) => pointObject[c.contributor] || defaultPoints)
    const comments = props.candidates.map((c) => commentObject[c.contributor] || "")
    await props.vote(points, comments)
  }

  const renderItems = () => {
    return props.candidates.map((candidate) => {
      const point = pointObject[candidate.contributor] || props.perspectives.map(() => 0)
      const comment = commentObject[candidate.contributor] || ""
      const distribution = distributionObject[candidate.contributor] || 0
      const isYou = candidate.contributor === address
      return (
        <div key={candidate.contributor}>
          <CandidateCard
            candidate={candidate}
            perspectives={props.perspectives}
            point={point}
            comment={comment}
            tokenSymbol={props.tokenSymbol}
            distribution={distribution}
            disabled={isYou}
            onChangePoint={(point) => {
              setPointObject({ ...pointObject, [candidate.contributor]: point })
            }}
            onChangeComment={(comment) => {
              setCommentObject({ ...commentObject, [candidate.contributor]: comment })
            }}
          />
        </div>
      )
    })
  }

  const renderSaveButton = () => {
    if (props.candidates.length === 0) return null
    return (
      <div style={{ position: "fixed", bottom: 0, right: 0, left: matches ? 0 : 250 }}>
        <Container>
          <Group position="center" my="xl">
            <Button
              size="lg"
              radius="md"
              onClick={_vote}
              variant="gradient"
              gradient={{ from: "blue", to: "grape" }}
              disabled={!isTheTimeCanVote}
            >
              {isTheTimeCanVote ? t.Button.Vote : t.Button.WaitToVote(theTimeCanVote)}
            </Button>
            {props.isAdmin ? (
              <Group position="center" my="xl">
                <Button size="lg" color="red" radius="md" onClick={props.settle}>
                  {t.Button.SettlePollForAdmin}
                </Button>
              </Group>
            ) : (
              <div />
            )}
          </Group>
        </Container>
      </div>
    )
  }

  return (
    <div>
      <AddYourContribution voted={props.alreadyVoted} candidateToPoll={props.candidateToPoll} isWeb3={props.isWeb3} />
      {props.alreadyVoted ? (
        <Alert mb="md" icon={<IconAlertCircle size={16} />} color="red">
          {AlreadyVoteMessage}
        </Alert>
      ) : (
        <div />
      )}
      {renderItems()}
      <Space h={100} />
      {renderSaveButton()}
    </div>
  )
}
