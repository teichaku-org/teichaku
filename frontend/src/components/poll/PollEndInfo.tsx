import { useLocale } from "@/i18n/useLocale"
import { getLeftTime, isPollEnded } from "@/utils/calculateLeftTime"
import { Button, Text } from "@mantine/core"
import { useInterval } from "@mantine/hooks"
import { useState, useEffect } from "react"

interface Props {
  startDate: Date
  endDate: Date
  settle?: () => void
}

export const PollEndInfo = (props: Props) => {
  const { t } = useLocale()
  const startTimeStamp = props.startDate
  const endTimeStamp = props.endDate

  const [leftTimeStr, setLeftTimeStr] = useState("")
  const intervalText = `${startTimeStamp.toDateString()} - ${endTimeStamp.toDateString()}`
  const interval = useInterval(() => {
    if (endTimeStamp) setLeftTimeStr(getLeftTime(endTimeStamp))
  }, 1000)
  const isEnded = isPollEnded(endTimeStamp)

  useEffect(() => {
    interval.start()
    return interval.stop
  }, [endTimeStamp])

  if (isEnded) {
    if (!props.settle) {
      return (
        <div>
          <Text>{t.Poll.Title}</Text>
        </div>
      )
    }
    return (
      <>
        <Text color="lightGray">{intervalText}</Text>
        <Button size="lg" color="red" radius="md" onClick={props.settle}>
          {t.Button.SettlePoll}
        </Button>
      </>
    )
  }

  return (
    <>
      <Text color="lightGray">{intervalText}</Text>
      <Text>
        {t.Contribution.PollEndInfo.LeftTimeText}
        {"  "}
        <Text size="xl" span variant="gradient" gradient={{ from: "blue", to: "grape" }}>
          {leftTimeStr}
        </Text>
      </Text>
    </>
  )
}
