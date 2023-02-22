import usePoll from "@/hooks/dao/usePoll";
import { useLocale } from "@/i18n/useLocale";
import { Button, Paper, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const PollPerspectiveSetting = () => {
  const { t } = useLocale();
  const router = useRouter()
  const dao = { daoId: router.query.daoId as string, projectId: router.query.projectId as string }
  //TODO: Buildを通すために一旦isWeb3 = Trueを入れる
  const { pollDetail, loadCurrentMaxPoll, setPerspectives } = usePoll(dao, true)
  const { PollPerspectiveSetting } = t.Settings;
  const { Perspective } = PollPerspectiveSetting;

  useEffect(() => {
    loadCurrentMaxPoll()
  }, [])

  useEffect(() => {
    if (pollDetail) {
      form.setValues({
        perspective1: pollDetail.perspectives[0],
        perspective2: pollDetail.perspectives[1],
        perspective3: pollDetail.perspectives[2],
        perspective4: pollDetail.perspectives[3],
        perspective5: pollDetail.perspectives[4],
      })
    }
  }, [pollDetail])

  const form = useForm({
    initialValues: {
      perspective1: "",
      perspective2: "",
      perspective3: "",
      perspective4: "",
      perspective5: "",
    },
  });

  const update = () => {
    const result = [
      form.values.perspective1,
      form.values.perspective2,
      form.values.perspective3,
      form.values.perspective4,
      form.values.perspective5,
    ]
    const perspectives = result.filter((item) => item !== "" && item !== undefined)
    setPerspectives(perspectives)
  }

  return (
    <Paper p="lg" mb="lg">
      <Text size="md" weight={700}>
        {PollPerspectiveSetting.Title}
      </Text>

      <TextInput
        label={Perspective.Label(1)}
        placeholder={Perspective.InitialValues.Perspective1}
        mt="md"
        name="perspective1"
        variant="filled"
        {...form.getInputProps("perspective1")}
      />

      <TextInput
        label={Perspective.Label(2)}
        placeholder={Perspective.InitialValues.Perspective2}
        mt="md"
        name="perspective2"
        variant="filled"
        {...form.getInputProps("perspective2")}
      />

      <TextInput
        label={Perspective.Label(3)}
        placeholder={Perspective.InitialValues.Perspective3}
        mt="md"
        name="perspective3"
        variant="filled"
        {...form.getInputProps("perspective3")}
      />

      {/* 
      <TextInput
        label={Perspective.Label(4)}
        mt="md"
        name="perspective4"
        variant="filled"
        {...form.getInputProps("perspective4")}
      />

      <TextInput
        label={Perspective.Label(5)}
        mt="md"
        name="perspective5"
        variant="filled"
        {...form.getInputProps("perspective5")}
      /> */}

      <div style={{ height: 10 }} />
      <Button onClick={update}>{t.Button.Update}</Button>
    </Paper>
  );
};
