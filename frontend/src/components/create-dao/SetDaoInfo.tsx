import { AppInfo } from "@/constants/AppInfo";
import { CreateDAOName, CreateDAOAvatar, CreateDAODescription, CreateDAOFirstProject } from "@/domains/atoms/CreateDaoAtom";
import { useLocale } from "@/i18n/useLocale";
import { snakeCase } from "@/utils/snakeCase";
import { Paper, Card, TextInput, Button, Text, Title, Center } from "@mantine/core"
import { useAtom } from "jotai";
import { useState } from "react";

export const SetDaoInfo = () => {
    const { t } = useLocale();
    const [projectName, setProjectName] = useAtom(CreateDAOFirstProject)
    const [name, setName] = useAtom(CreateDAOName)
    const [avatar, setAvatar] = useAtom(CreateDAOAvatar)
    const [description, setDescription] = useAtom(CreateDAODescription)


    const snakedName = snakeCase(name);
    const snakedProjectName = snakeCase(projectName);
    const urlPath = "/" + snakedName + "/" + snakedProjectName;
    return <div>
        <Center mb="xl">
            <Title size="h1">
                {t.CreateDao.Step1.Title}
            </Title>
        </Center>

        <Text mb="md">{t.CreateDao.Step1.URLPreview}
            {AppInfo.url}<b>{urlPath}</b>
        </Text>
        <TextInput
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder={t.CreateDao.Step1.DAONamePlaceholder} label={t.CreateDao.Step1.DAOName} mb="sm" />
        <TextInput
            value={projectName}
            onChange={e => setProjectName(e.currentTarget.value)}
            placeholder={t.CreateDao.Step1.FirstProjectNamePlaceholder} label={t.CreateDao.Step1.FirstProjectName} mb="sm" />

    </div>
}