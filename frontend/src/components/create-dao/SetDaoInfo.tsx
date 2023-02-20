import { AppInfo } from "@/constants/AppInfo";
import { CreateDAOAvatar, CreateDAODescription, CreateDAOFirstProject, CreateDAOName } from "@/domains/atoms/CreateDaoAtom";
import { DaoInfo } from "@/domains/DaoInfo";
import { getContract } from "@/hooks/web3/useMetaMask";
import { useLocale } from "@/i18n/useLocale";
import { DAOHistory } from "@/types";
import { snakeCase } from "@/utils/snakeCase";
import { Card, Center, SimpleGrid, Text, TextInput, Title } from "@mantine/core";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import artifact from "../../abi/DAOHistory.sol/DAOHistory.json";

interface Props {
    daoInfoDefault?: DaoInfo
}

export const SetDaoInfo = (props: Props) => {
    const { t } = useLocale();
    const [projectName, setProjectName] = useAtom(CreateDAOFirstProject)
    const [name, setName] = useAtom(CreateDAOName)
    const [avatar, setAvatar] = useAtom(CreateDAOAvatar)
    const [description, setDescription] = useAtom(CreateDAODescription)
    const [alreadyExist, setAlreadyExist] = useState(false)

    const snakedName = snakeCase(name);
    const snakedProjectName = snakeCase(projectName);
    const urlPath = "/" + snakedName + "/" + snakedProjectName;

    const checkDuplicate = () => {
        const contractAddress = process.env
            .NEXT_PUBLIC_DAOHISTORY_CONTRACT_ADDRESS as string;
        const contract = getContract(contractAddress, artifact.abi) as DAOHistory;
        contract.functions.getDaoInfo(snakedName).then((res) => {
            const _daoInfo = res[0]
            if (_daoInfo[0].length > 0) {
                setAlreadyExist(true)
            } else {
                setAlreadyExist(false)
            }
        })
    }

    useEffect(() => {
        //props.daoInfoDefaultが存在する場合は、初期値をセットする
        if (!props.daoInfoDefault) return
        setProjectName(props.daoInfoDefault.projects[0])
        setName(props.daoInfoDefault.name)
        setAvatar(props.daoInfoDefault.logo)
        setDescription(props.daoInfoDefault.description)
    }, [props.daoInfoDefault])

    useEffect(() => {
        checkDuplicate()
    }, [name])

    return <div>
        <Center mb="xl">
            <Title size="h1">
                {t.CreateDao.Step1.Title}
            </Title>
        </Center>

        <SimpleGrid
            cols={1}
            spacing="lg"
            breakpoints={[
                { maxWidth: 800, cols: 1, spacing: 'sm' },
            ]}
        >
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
}