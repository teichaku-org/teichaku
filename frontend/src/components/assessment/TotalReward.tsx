import useDaoToken from "@/hooks/dao/useDaoToken";
import { css } from "@emotion/react";
import { Text, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router"

interface Props {
  reward: string;
}

export const TotalReward = (props: Props) => {
  const router = useRouter()
  const { daoId, projectId } = router.query
  const theme = useMantineTheme();
  const { tokenSymbol } = useDaoToken({ daoId: daoId as string, projectId: projectId as string })
  return (
    <Text
      component="span"
      align="center"
      color={theme.colorScheme === "dark" ? "white" : "black"}
      size="xl"
      weight={700}
      style={{ fontFamily: "Greycliff CF, sans-serif" }}
      css={css`
        font-size: 60px;
        margin-left: 5px;
      `}
    >
      {props.reward}
      <span
        css={css`
          font-size: 20px;
          margin-left: 5px;
        `}
      >
        {tokenSymbol}
      </span>
    </Text>
  );
};
