import { Title, Textarea, TextInput, MultiSelect, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { ContributionExamples } from "../poll/ContributionExamples";
import { showNotification } from "@mantine/notifications";
import { Router, useRouter } from "next/router";
import { Links } from "@/constants/Links";
import { useLocale } from "@/i18n/useLocale";

interface Props {
  candidateToPoll: (contributionText: string, evidences: string[], roles: string[]) => void;
  title?: string;
}

export const ContributionCard = (props: Props) => {
  const { t } = useLocale();
  const { Notification, Contribution, Evidence, Role } = t.Contribution.ContributionCard;
  const router = useRouter();
  const sprintReviewPath = Links.getCommonPath(router) + "/poll";
  const [showExample, setShowExample] = useState(true);
  const [placeholder, setPlaceholder] = useState(Contribution.Placeholder);
  const [roles, setRoles] = useState([
    "Engineer",
    "Designer",
    "Product Manager",
    "Marketing",
    "Sales",
    "Customer Support",
  ]);
  const form = useForm({
    initialValues: {
      roles: [],
      contributionText: "",
      evidence1: "",
      evidence2: "",
      evidence3: "",
    },
  });

  useEffect(() => {
    loadLocalStorage();
  }, []);

  useEffect(() => {
    loadLocalStorage();
  }, []);

  const loadLocalStorage = () => {
    const candidate = localStorage.getItem("candidate");
    if (candidate) {
      form.setValues(JSON.parse(candidate));
      setShowExample(false);
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("candidate");
  };

  const saveLocalStorage = () => {
    localStorage.setItem("candidate", JSON.stringify(form.values));
    window.location.reload();
  };

  const _candidate = async () => {
    clearLocalStorage();
    await props.candidateToPoll(
      form.values.contributionText,
      [form.values.evidence1, form.values.evidence2, form.values.evidence3],
      form.values.roles
    );
    showNotification({
      id: "candidate",
      title: Notification.Title,
      message: Notification.Message,
      autoClose: 4000,
      loading: true,
      onClose: () => {
        router.push(sprintReviewPath);
      },
    });
  };

  const onClickExample = (exmapleText: string) => {
    //form.setFieldValue("contributionText", exmapleText)
    setPlaceholder(exmapleText);
    setShowExample(false);
  };
  return (
    <>
      {showExample ? (
        <ContributionExamples onClick={onClickExample} />
      ) : (
        <>
          {props.title ? (
            <Title
              order={2}
              size="h1"
              sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
              weight={900}
              align="center"
            >
              {props.title}
            </Title>
          ) : (
            <div />
          )}

          <Textarea
            autoFocus={true}
            mt="md"
            label={Contribution.Label}
            placeholder={placeholder}
            maxRows={10}
            minRows={5}
            autosize
            name="contributionText"
            variant="filled"
            {...form.getInputProps("contributionText")}
            required={true}
          />

          <TextInput
            label={Evidence.Label(1)}
            placeholder="https://..."
            mt="md"
            name="evidence1"
            variant="filled"
            {...form.getInputProps("evidence1")}
          />
          {form.values.evidence1 && (
            <TextInput
              label={Evidence.Label(2)}
              placeholder="https://..."
              mt="md"
              name="evidence2"
              variant="filled"
              {...form.getInputProps("evidence2")}
            />
          )}
          {form.values.evidence2 && (
            <TextInput
              label={Evidence.Label(3)}
              placeholder="https://..."
              mt="md"
              name="evidence3"
              variant="filled"
              {...form.getInputProps("evidence3")}
            />
          )}

          <MultiSelect
            mt="md"
            label={Role.Label}
            placeholder={Role.Placeholder}
            data={roles}
            searchable
            creatable
            dropdownPosition="top"
            getCreateLabel={(query) => Role.CreateLabel(query)}
            onCreate={(query) => {
              setRoles([...roles, query]);
              return query;
            }}
            {...form.getInputProps("roles")}
          />
          <Group position="center" mt="xl">
            <Button color="gray" radius="md" onClick={saveLocalStorage}>
              {t.Button.SaveDraft}
            </Button>
            <Button radius="md" onClick={_candidate} variant="gradient" gradient={{ from: "blue", to: "grape" }}>
              {t.Button.SubmitToBlockchain}
            </Button>
          </Group>
        </>
      )}
    </>
  );
};
