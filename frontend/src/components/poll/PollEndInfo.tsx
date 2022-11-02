import { useLocale } from "@/i18n/useLocale";
import { getLeftTime } from "@/utils/calculateLeftTime";
import { Text } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { useState, useEffect } from "react";

interface Props {
  startDate: Date;
  endDate: Date;
}

export const PollEndInfo = (props: Props) => {
  const { t } = useLocale();
  const startTimeStamp = props.startDate;
  const endTimeStamp = props.endDate;

  const [leftTimeStr, setLeftTimeStr] = useState("");
  const intervalText = `${startTimeStamp.toDateString()} - ${endTimeStamp.toDateString()}`;
  const interval = useInterval(() => {
    if (endTimeStamp) setLeftTimeStr(getLeftTime(endTimeStamp));
  }, 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [endTimeStamp]);

  return (
    <>
      <Text color="dimmed">{intervalText}</Text>
      <Text>
        {t.Contribution.PollEndInfo.LeftTimeText}
        {"  "}
        <Text size="xl" span variant="gradient" gradient={{ from: "blue", to: "grape" }}>
          {leftTimeStr}
        </Text>
      </Text>
    </>
  );
};
