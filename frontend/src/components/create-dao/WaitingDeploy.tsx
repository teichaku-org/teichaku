import {
  CreateDAOName,
  CreateDAOFirstProject,
  CreateDAORewardTokenAddress,
  CreateDAORewardTokenContributorAmount,
  CreateDAORewardTokenReviewerAmount,
  CreateDAOSprintDuration,
  CreateDAODescription,
  CreateDAOAvatar,
} from "@/domains/atoms/CreateDaoAtom";
import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom";
import useDaoLauncher from "@/hooks/dao/useDaoLauncher";
import { useLocale } from "@/i18n/useLocale";
import { snakeCase } from "@/utils/snakeCase";
import { Button, Center, Container, Loader, Stack, Text } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const WaitingDeploy = () => {
  const { t } = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { createDao } = useDaoLauncher();
  const [name] = useAtom(CreateDAOName);
  const [projectName] = useAtom(CreateDAOFirstProject);
  const [description] = useAtom(CreateDAODescription);
  const [avator] = useAtom(CreateDAOAvatar);
  const [tokenAddress] = useAtom(CreateDAORewardTokenAddress);
  const [contributorReward] = useAtom(CreateDAORewardTokenContributorAmount);
  const [reviewerReward] = useAtom(CreateDAORewardTokenReviewerAmount);
  const [sprintDuration] = useAtom(CreateDAOSprintDuration);
  const [isWeb3, setIsWeb3] = useAtom(Web3FlagAtom);

  const daoId = snakeCase(name);
  const projectId = snakeCase(projectName);

  const _createDao = async () => {
    setErrorMessage("");
    setLoading(true);
    try {
      await createDao(
        daoId,
        projectId,
        name,
        description,
        "https://...",
        avator,
        tokenAddress,
        contributorReward || 0,
        reviewerReward || 0,
        sprintDuration || 7 * 24 * 60 * 60
      );
      setLoading(false);
    } catch (err: any) {
      //必要に応じてRetry
      setErrorMessage(err.message);
    }
  };

  return (
    <Stack>
      <Center>{loading && <Loader color="violet" size="xl" />}</Center>
      {isWeb3 ? (
        <>
          <Center>
            <Text>{t.CreateDao.Complete.Wait}</Text>
          </Center>
          <Center>
            <Text color="red">{errorMessage}</Text>
          </Center>
          {errorMessage ? (
            <Center>
              <Button onClick={_createDao}>{t.CreateDao.Complete.Retry}</Button>
            </Center>
          ) : (
            <Center>
              <Button onClick={_createDao}>
                {t.CreateDao.Complete.AcceptTransaction}
              </Button>
            </Center>
          )}
        </>
      ) : (
        <>
          <Center>
            <Text>{t.CreateDao.CompleteWeb2.Wait}</Text>
          </Center>
          <Center>
            <Text color="red">{errorMessage}</Text>
          </Center>
          {errorMessage ? (
            <Center>
              <Button onClick={_createDao}>
                {t.CreateDao.CompleteWeb2.Retry}
              </Button>
            </Center>
          ) : (
            <Center>
              <Button onClick={_createDao}>
                {t.CreateDao.CompleteWeb2.AcceptTransaction}
              </Button>
            </Center>
          )}
        </>
      )}
    </Stack>
  );
};
