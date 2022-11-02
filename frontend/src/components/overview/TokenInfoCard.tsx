import { useLocale } from "@/i18n/useLocale";
import { shortenAddress } from "@/utils/shortenAddress";
import { Paper, Progress } from "@mantine/core";

import { Card, createStyles, Group, Text } from "@mantine/core";
import { IconCopyButton } from "../common/CopyButton";

const useStyles = createStyles((theme) => ({
  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1,
  },
}));

interface Props {
  tokenTotalSupply: number;
  tokenSymbol: string;
  tokenName: string;
  contractAddress: string;
  contributorReward: number;
  voterReward: number;
  treasuryBalance: number;
}
export function TokenInfoCard(props: Props) {
  const { classes, theme } = useStyles();
  const { t } = useLocale();
  const {
    RewardsToken,
    ContractAddress,
    TokenName,
    TokenSymbol,
    TotalSupply,
    TreasuryBalance,
    TotalDistributionsPerSprint,
    Contributor,
    Reviewer,
  } = t.Overview.TokenInfoCard;

  const { tokenTotalSupply, tokenSymbol, tokenName, contractAddress, treasuryBalance } = props;
  const { contributorReward, voterReward } = props;

  const contributorRewardPercent = (contributorReward / (contributorReward + voterReward)) * 100;
  const voterRewardPercent = (voterReward / (contributorReward + voterReward)) * 100;
  const contributorValue = contributorReward + " " + tokenSymbol;
  const voterValue = voterReward + " " + tokenSymbol;
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Text size="xl" color="dimmed" mb="sm">
        {RewardsToken}
      </Text>

      <Group>
        <Card p="xl">
          <Text size="xs" color="dimmed">
            {ContractAddress}
          </Text>
          <Group spacing="xs">
            <Text className={classes.lead}>{shortenAddress(contractAddress)}</Text>
            <IconCopyButton text={contractAddress} />
          </Group>
        </Card>
        <Card p="xl">
          <Text size="xs" color="dimmed">
            {TokenName}
          </Text>
          <Text className={classes.lead}>{tokenName}</Text>
        </Card>
        <Card p="xl">
          <Text size="xs" color="dimmed">
            {TokenSymbol}
          </Text>
          <Text className={classes.lead}>{"$" + tokenSymbol}</Text>
        </Card>

        <Card p="xl">
          <Text size="xs" color="dimmed">
            {TotalSupply}
          </Text>
          <Text className={classes.lead}>{tokenTotalSupply}</Text>
        </Card>
        <Card p="xl">
          <Text size="xs" color="dimmed">
            {TreasuryBalance}
          </Text>
          <Text className={classes.lead}>{treasuryBalance}</Text>
        </Card>
      </Group>

      <Text size="xl" color="dimmed" mt="xl" mb="sm">
        {TotalDistributionsPerSprint}
      </Text>
      <Progress
        radius="xl"
        size={30}
        sections={[
          { value: contributorRewardPercent, color: "blue", label: Contributor, tooltip: contributorValue },
          { value: voterRewardPercent, color: "grape", label: Reviewer, tooltip: voterValue },
        ]}
      />
    </Paper>
  );
}
