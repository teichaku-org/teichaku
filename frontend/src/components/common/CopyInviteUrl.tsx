import { Links } from "@/constants/Links"
import { useLocale } from "@/i18n/useLocale"
import { Button, Center, Container, Group, Text, TextInput, Title } from "@mantine/core"
import { useRouter } from "next/router"
import { IconCopyButton } from "./CopyButton"
import { AppInfo } from "@/constants/AppInfo"
import { useAtom } from "jotai"
import { DaoInfoAtom } from "@/domains/atoms/DaoInfoAtom"

const CopyInviteUrl = () => {
  const { t } = useLocale()
  const router = useRouter()
  const commonPath = Links.getCommonPath(router)
  const [daoInfo] = useAtom(DaoInfoAtom)
  return (
    <Container>
      <Title
        order={1}
        size="h1"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
        weight={900}
        align="center"
      >
        {t.Common.NodataMessage.Invite.Title}
      </Title>
      <Center my={"xl"}>
        <Text size="xl"> {t.Common.NodataMessage.Invite.Description}</Text>
      </Center>
      <div style={{ position: "relative" }}>
        <TextInput size={"lg"} my={"md"} label={t.CreateDao.Step1.DAOName} value={daoInfo?.name} readOnly />
        <TextInput
          size={"lg"}
          my={"md"}
          label={t.CreateDao.Step1.FirstProjectName}
          value={daoInfo?.projects[0]}
          readOnly
        />

        <TextInput
          size={"lg"}
          my={"md"}
          label={t.Common.NodataMessage.Invite.Vision}
          value={daoInfo?.description}
          readOnly
        />

        <TextInput size={"lg"} my={"md"} label={"URL"} value={AppInfo.url + commonPath + "/overview"} readOnly />
        <div style={{ position: "absolute", top: "90%", right: 5, height: "100%" }}>
          <IconCopyButton text={AppInfo.url + commonPath + "/overview"} />
        </div>
      </div>
    </Container>
  )
}

export default CopyInviteUrl
