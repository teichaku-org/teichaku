import { Links } from "@/constants/Links"
import { useLocale } from "@/i18n/useLocale"
import { Button, Center, Container, Group, Text, Textarea, TextInput, Title } from "@mantine/core"
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

  const inviteMessage = `${daoInfo?.name} DAOのビジョンは、『${daoInfo?.description}』を実現することです。
以下のリンクから、詳細を確認することができます。

${AppInfo.url + commonPath + "/overview"}
あなたの参加を心待ちにしています！`

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
        <div style={{ position: "relative" }}>
          <Textarea autosize minRows={3} maxRows={6} size={"lg"} my={"md"} label={""} value={inviteMessage} readOnly />
          <div style={{ position: "absolute", right: 10, bottom: 10 }}>
            <IconCopyButton text={inviteMessage} />
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <TextInput size={"lg"} my={"md"} label={"URL"} value={AppInfo.url + commonPath + "/overview"} readOnly />

          <div style={{ position: "absolute", right: 10, bottom: 10 }}>
            <IconCopyButton text={AppInfo.url + commonPath + "/overview"} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default CopyInviteUrl
