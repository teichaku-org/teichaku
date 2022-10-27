import { Contribution } from "@/domains/Contribution"
import useMetaMask from "@/hooks/web3/useMetaMask"
import { Alert, Button, Group } from "@mantine/core"
import { IconAlertCircle, IconPlus } from "@tabler/icons"
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
}
export const PollSystem = (props: Props) => {
    const { address } = useMetaMask()
    const [pointObject, setPointObject] = useState<{ [key: string]: number[] }>({})
    const [commentObject, setCommentObject] = useState<{ [key: string]: string }>({})
    const [distributionObject, setDistributionObject] = useState<{ [key: string]: number }>({})

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
            return point / total * props.contributorReward
        })
        const distributionObject = props.candidates.reduce((obj, candidate, index) => {
            obj[candidate.contributor] = Math.round(distribution[index])
            return obj
        }, {} as { [key: string]: number })
        setDistributionObject(distributionObject)
    }, [pointObject])

    const saveLocalStorage = () => {
        localStorage.setItem("points", JSON.stringify(pointObject))
        localStorage.setItem("comments", JSON.stringify(commentObject))
        window.location.reload()
    }

    const loadLocalStorage = () => {
        const points = localStorage.getItem("points")
        const comments = localStorage.getItem("comments")
        if (points && comments) {
            setPointObject(JSON.parse(points))
            setCommentObject(JSON.parse(comments))
        }
    }

    const clearLocalStorage = () => {
        localStorage.removeItem("points")
        localStorage.removeItem("comments")
    }

    const _vote = () => {
        const defaultPoints = props.perspectives.map(() => 0)
        const points = props.candidates.map((c) => pointObject[c.contributor] || defaultPoints)
        const comments = props.candidates.map((c) => commentObject[c.contributor] || "")
        props.vote(points, comments)
        clearLocalStorage()
    }

    const renderItems = () => {
        return props.candidates.map((candidate) => {
            const point = pointObject[candidate.contributor] || []
            const comment = commentObject[candidate.contributor] || ""
            const distribution = distributionObject[candidate.contributor] || 0
            const isYou = candidate.contributor === address
            return <div key={candidate.contributor}>
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
        })
    }

    const renderSaveButton = () => {
        if (props.candidates.length === 0) return null
        return <><Group position="center" my="xl">
            <Button size="lg" color="gray" radius="md" onClick={saveLocalStorage}>Save Draft</Button>
            <Button size="lg" radius="md" onClick={_vote} variant="gradient" gradient={{ from: 'blue', to: 'grape' }}>Submit to Blockchain</Button>
        </Group>

            {
                props.isAdmin ? <Group position="center" my="xl">
                    <Button size="xl" color="red" radius="md" onClick={props.settle}>Settle This Poll(Only Admin Can Do it)</Button>
                </Group> : <div />
            }
        </>
    }

    return <div>
        <AddYourContribution
            candidateToPoll={props.candidateToPoll}
        />
        {renderItems()}
        {
            props.alreadyVoted ? <Alert mb="md" icon={<IconAlertCircle size={16} />} color="grape">
                You already voted but you can vote for revision
            </Alert> : <div />}

        {renderSaveButton()}
    </div>
}
