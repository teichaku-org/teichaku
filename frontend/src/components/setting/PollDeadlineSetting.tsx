import usePoll from "@/hooks/dao/usePoll";
import { useLocale } from "@/i18n/useLocale";
import { Button, NumberInput, Paper, Space, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const PollDeadlineSetting = () => {
  const { t } = useLocale();
  const router = useRouter()
  const { daoId, projectId } = router.query
  const dao = { daoId: daoId as string, projectId: projectId as string }
  //TODO: Buildを通すために一旦isWeb3 = Trueを入れる
  const { pollDetail, loadCurrentMaxPoll, setStartTime, setDuration } = usePoll(dao, true)
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [pollDuration, setPollDuration] = useState<number | undefined>();

  useEffect(() => {
    loadCurrentMaxPoll();
  }, []);

  useEffect(() => {
    if (pollDetail) {
      console.log(pollDetail)
      setStartDate(pollDetail.startTimeStamp)
      setEndDate(pollDetail.endTimeStamp)
      // duraitonを計算　end - start
      const durationDay = (pollDetail.endTimeStamp.getTime() - pollDetail.startTimeStamp.getTime()) / (60 * 60 * 24 * 1000)
      setPollDuration(durationDay)
    }
  }, [pollDetail])


  const onChangeStartDate = (value: Date) => {
    setStartDate(value);
    if (pollDuration && value)
      setEndDate(new Date(value.getTime() + (pollDuration * 24 * 60 * 60 * 1000)))
  };

  const setSprintDuration = (value: number | undefined) => {
    setPollDuration(value); //days
    if (value && startDate)
      setEndDate(new Date(startDate!.getTime() + (value * 24 * 60 * 60 * 1000)))
  };

  const update = async () => {
    if (pollDetail && startDate && pollDuration) {
      if (pollDetail.startTimeStamp !== startDate)
        setStartTime(pollDetail.pollId, startDate.getTime() / 1000)
      const duration = (pollDetail.endTimeStamp.getTime() - pollDetail.startTimeStamp.getTime()) / (60 * 60 * 24 * 1000 * 1000)
      if (duration !== pollDuration)
        setDuration(pollDetail.pollId, pollDuration)
    }
  }

  return (
    <Paper p="lg" mb="lg">
      <Text size="md" weight={700}>
        {t.Settings.PollDeadlineSetting.Title}
      </Text>
      <DatePicker
        mb="md"
        label={t.Settings.PollDeadlineSetting.DatePicker.Label}
        placeholder={t.Settings.PollDeadlineSetting.DatePicker.Placeholder}
        value={startDate}
        inputFormat="YYYY/MM/DD"
        onChange={onChangeStartDate}
      />

      <Space h="md" />
      <Text size="md" weight={700}>
        {t.Settings.PollDuration.Title}
      </Text>
      <NumberInput
        label={t.Settings.PollDuration.Days}
        min={1}
        max={30}
        value={pollDuration}
        onChange={(e) => setSprintDuration(e)}
      />

      <Space h="md" />
      <Text size="md" weight={700}>
        {t.Settings.PollDeadlineSetting.PollDeadline.Label}
      </Text>
      <Text size="md">
        {endDate?.toLocaleDateString()}
      </Text>

      <Button onClick={update}>{t.Button.Update}</Button>

    </Paper>
  );
};
