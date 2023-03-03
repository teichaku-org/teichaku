import { AppInfo } from "@/constants/AppInfo"
import {
  CreateDAOAvatar,
  CreateDAODescription,
  CreateDAOFirstProject,
  CreateDAOIsAlreadyExist,
  CreateDAOName,
} from "@/domains/atoms/CreateDaoAtom"
import { getContract } from "@/hooks/web3/useMetaMask"
import { useLocale } from "@/i18n/useLocale"
import { DAOHistory } from "@/types"
import { snakeCase } from "@/utils/snakeCase"
import { Card, Center, SimpleGrid, Text, Textarea, TextInput, Title } from "@mantine/core"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import artifact from "../../abi/DAOHistory.sol/DAOHistory.json"
import { APIClient } from "@/utils/APIClient"

export const SetDaoInfo = (props: { isWeb3: boolean }) => {
  const { t } = useLocale()
  const [projectName, setProjectName] = useAtom(CreateDAOFirstProject)
  const [name, setName] = useAtom(CreateDAOName)
  const [avatar, setAvatar] = useAtom(CreateDAOAvatar)
  const [description, setDescription] = useAtom(CreateDAODescription)
  const [alreadyExist, setAlreadyExist] = useAtom(CreateDAOIsAlreadyExist)

  const snakedName = snakeCase(name)
  const snakedProjectName = snakeCase(projectName)
  const urlPath = "/web2/" + snakedName + "/" + snakedProjectName

  const apiClient = new APIClient()

  const checkDuplicate = () => {
    //TODO: hookから呼び出す
    if (props.isWeb3) {
      const contractAddress = process.env.NEXT_PUBLIC_DAOHISTORY_CONTRACT_ADDRESS as string
      const contract = getContract(contractAddress, artifact.abi) as DAOHistory
      contract.functions.getDaoInfo(snakedName).then((res) => {
        const _daoInfo = res[0]
        if (_daoInfo[0].length > 0) {
          setAlreadyExist(true)
        } else {
          setAlreadyExist(false)
        }
      })
    } else {
      apiClient.post("/getDaoInfo", { daoId: snakedName }).then((res) => {
        if (res?.data.name) {
          setAlreadyExist(true)
        } else {
          setAlreadyExist(false)
        }
      })
    }
  }

  useEffect(() => {
    // TODO: Web2で動作しないため、一旦コメントアウトする。これによって、既存のDAO名を入力しても、重複エラーが出なくなる。
    // checkDuplicate()
    setAlreadyExist(false)
  }, [name])

  return (
    <div>
      <SimpleGrid cols={1} spacing="lg" breakpoints={[{ maxWidth: 800, cols: 1, spacing: "sm" }]}>
        <Card shadow="xl" p="xl" mb="xl" mt={60} bg="black">
          <Center mb="xl">
            <Title size="h1">{t.CreateDao.Step1.Title}</Title>
          </Center>
          {/* <Text mb="md">
            {t.CreateDao.Step1.URLPreview}
            {AppInfo.url}
            <b>{urlPath}</b>
          </Text> */}

          <TextInput
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
            error={alreadyExist ? t.CreateDao.Step1.Duplicate : ""}
            placeholder={t.CreateDao.Step1.DAONamePlaceholder}
            description={t.CreateDao.Step1.DAONameDescription}
            label={t.CreateDao.Step1.DAOName}
            size="xl"
            mb="xl"
            onBlur={() => checkDuplicate()}
          />
          <Textarea
            value={description}
            required
            onChange={(e) => setDescription(e.currentTarget.value)}
            placeholder={t.CreateDao.Step1.DAOVision}
            label={t.CreateDao.Step1.DAOVisionPlaceholder}
            description={t.CreateDao.Step1.DAOVisionDescription}
            size="xl"
            mb="sm"
          />
          {/* <TextInput
            value={projectName}
            required
            onChange={(e) => setProjectName(e.currentTarget.value)}
            placeholder={t.CreateDao.Step1.FirstProjectNamePlaceholder}
            label={t.CreateDao.Step1.FirstProjectName}
            mb="sm"
          /> */}
        </Card>
        {/* 
            <Card shadow="" p="xl" mb="xl" >
                <Text mb="md">{t.CreateDao.Step1.URLPreview}
                    {AppInfo.url}<b>{urlPath}</b>
                </Text>
                <TextInput
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    required
                    error={alreadyExist ? t.CreateDao.Step1.Duplicate : ""}
                    placeholder={t.CreateDao.Step1.DAONamePlaceholder} label={t.CreateDao.Step1.DAOName} mb="sm" />
                <TextInput
                    value={projectName}
                    required
                    onChange={e => setProjectName(e.currentTarget.value)}
                    placeholder={t.CreateDao.Step1.FirstProjectNamePlaceholder} label={t.CreateDao.Step1.FirstProjectName} mb="sm" />
            </Card> */}
      </SimpleGrid>
    </div>
  )
}
