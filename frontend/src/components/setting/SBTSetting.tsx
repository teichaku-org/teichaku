import { useLocale } from "@/i18n/useLocale"
import { Button, Text, Paper, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { ethers } from "ethers"
import { useRouter } from "next/router"
import usePoll from "@/hooks/dao/usePoll"

export const SBTSetting = (props: { isWeb3: boolean }) => {
  const { t } = useLocale()
  const router = useRouter()
  const { daoId, projectId } = router.query
  //TODO: Buildを通すために一旦isWeb3 = Trueを入れる
  const { setTokenAddress } = usePoll({ daoId: daoId as string, projectId: projectId as string }, props.isWeb3)

  const form = useForm({
    initialValues: {
      nftAddress: "",
    },
    validate: {
      nftAddress: (value) =>
        value != "" && !ethers.utils.isAddress(value) ? t.CreateDao.Step2.InvalidTokenAddress : null,
    },
    validateInputOnChange: true,
  })

  const update = () => {
    setTokenAddress(null, form.values.nftAddress)
  }

  const shouldBeDisabled = () => {
    return form.values.nftAddress == "" || !form.isValid()
  }

  return (
    <Paper p="lg" mb="lg">
      <Text size="md" weight={700}>
        {t.Settings.SBTSetting.Title}
      </Text>
      <TextInput
        placeholder="0x..."
        label={t.Settings.SBTSetting.SBTAddressInput.Label}
        mb="sm"
        {...form.getInputProps("nftAddress")}
      />
      <Button disabled={shouldBeDisabled()} onClick={update}>
        {t.Button.Update}
      </Button>
    </Paper>
  )
}
