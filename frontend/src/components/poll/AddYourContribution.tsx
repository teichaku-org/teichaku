import { Button, Group, Modal } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";
import { ContributionCard } from "../contribution/ContributionCard";

interface Props {
    voted: boolean
    candidateToPoll: (contributionText: string, evidences: string[], roles: string[]) => void
}

export const AddYourContribution = (props: Props) => {
    const [opened, setOpened] = useState(false)
    const candidateToPoll = async (contributionText: string, evidences: string[], roles: string[]) => {
        await props.candidateToPoll(contributionText, evidences, roles)
        setOpened(false)
    }
    return <>
        <Modal
            opened={opened}
            size="xl"
            onClose={() => setOpened(false)}
        >
            <ContributionCard candidateToPoll={candidateToPoll} />
        </Modal>


        <Group position="center">
            <Button
                onClick={() => setOpened(true)}
                size="lg"
                variant="gradient"
                gradient={{ from: 'blue', to: 'grape' }}
                mb="md" fullWidth leftIcon={<IconPlus />}>
                {props.voted ? "Update Your Contribution" : "Add Your Contribution"}
            </Button>
        </Group>
    </>
}

