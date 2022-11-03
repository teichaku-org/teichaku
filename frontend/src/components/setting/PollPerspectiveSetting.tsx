import { useLocale } from "@/i18n/useLocale";
import { Button, Paper, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

export const PollPerspectiveSetting = () => {
  const { t } = useLocale();
  const { PollPerspectiveSetting } = t.Settings;
  const { Perspective } = PollPerspectiveSetting;

  const form = useForm({
    initialValues: {
      perspective1: Perspective.InitialValues.Perspective1,
      perspective2: Perspective.InitialValues.Perspective2,
      perspective3: Perspective.InitialValues.Perspective3,
      perspective4: "",
      perspective5: "",
    },
  });
  return (
    <Paper p="lg" mb="lg">
      <Text size="md" weight={700}>
        {PollPerspectiveSetting.Title}
      </Text>

      <TextInput
        label={Perspective.Label(1)}
        mt="md"
        name="perspective1"
        variant="filled"
        {...form.getInputProps("perspective1")}
      />
      {form.values.perspective1 && (
        <TextInput
          label={Perspective.Label(2)}
          mt="md"
          name="perspective2"
          variant="filled"
          {...form.getInputProps("perspective2")}
        />
      )}
      {form.values.perspective2 && (
        <TextInput
          label={Perspective.Label(3)}
          mt="md"
          name="perspective3"
          variant="filled"
          {...form.getInputProps("perspective3")}
        />
      )}
      {form.values.perspective3 && (
        <TextInput
          label={Perspective.Label(4)}
          mt="md"
          name="perspective4"
          variant="filled"
          {...form.getInputProps("perspective4")}
        />
      )}
      {form.values.perspective4 && (
        <TextInput
          label={Perspective.Label(5)}
          mt="md"
          name="perspective5"
          variant="filled"
          {...form.getInputProps("perspective5")}
        />
      )}
      <div style={{ height: 10 }} />
      <Button>{t.Button.Update}</Button>
    </Paper>
  );
};
