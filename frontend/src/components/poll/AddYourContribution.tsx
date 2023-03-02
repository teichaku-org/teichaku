import { useLocale } from "@/i18n/useLocale"
import { Button, Group, Modal } from "@mantine/core"
import { IconPlus } from "@tabler/icons"
import { useState } from "react"
import { ContributionCard } from "../contribution/ContributionCard"

interface Props {
  voted: boolean
  candidateToPoll: (contributionText: string, evidences: string[], roles: string[]) => void
  isWeb3: boolean
}

export const AddYourContribution = (props: Props) => {
  const { t } = useLocale()
  const [opened, setOpened] = useState(false)
  const candidateToPoll = async (contributionText: string, evidences: string[], roles: string[]) => {
    await props.candidateToPoll(contributionText, evidences, roles)
    setOpened(false)
  }
  return (
    <>
      <Modal opened={opened} size="xl" onClose={() => setOpened(false)}>
        <ContributionCard candidateToPoll={candidateToPoll} title={t.Contribution.Title} isWeb3={props.isWeb3} />
      </Modal>

      <Group position="center">
        <Button
          onClick={() => setOpened(true)}
          size="lg"
          variant="gradient"
          gradient={{ from: "blue", to: "grape" }}
          mb="md"
          fullWidth
          leftIcon={<IconPlus />}
        >
          {t.Button.AddYourContribution}
        </Button>
      </Group>
    </>
  )
}
