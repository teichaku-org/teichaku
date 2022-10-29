import { Title, Textarea, TextInput, MultiSelect, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { ContributionExamples } from "../poll/ContributionExamples";

interface Props {
    candidateToPoll: (contributionText: string, evidences: string[], roles: string[]) => void
    title?: string
}

export const ContributionCard = (props: Props) => {
    const [showExample, setShowExample] = useState(true)
    const [roles, setRoles] = useState([
        "Engineer",
        "Designer",
        "Product Manager",
        "Marketing",
        "Sales",
        "Customer Support"
    ])
    const form = useForm({
        initialValues: {
            roles: [],
            contributionText: '',
            evidence1: '',
            evidence2: '',
            evidence3: '',
        },
    });

    useEffect(() => {
        loadLocalStorage()
    }, [])


    const loadLocalStorage = () => {
        const candidate = localStorage.getItem("candidate")
        if (candidate) {
            form.setValues(JSON.parse(candidate))
            setShowExample(false)
        }
    }

    const clearLocalStorage = () => {
        localStorage.removeItem("candidate")
    }

    const saveLocalStorage = () => {
        localStorage.setItem("candidate", JSON.stringify(form.values))
        window.location.reload()
    }

    const _candidate = async () => {
        clearLocalStorage()
        await props.candidateToPoll(form.values.contributionText, [form.values.evidence1, form.values.evidence2, form.values.evidence3], form.values.roles)
    }

    const onClickExample = (exmapleText: string) => {
        form.setFieldValue("contributionText", exmapleText)
        setShowExample(false)
    }
    return <>{showExample ? <ContributionExamples onClick={onClickExample} /> :
        <>
            {props.title ? <Title
                order={2}
                size="h1"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
                weight={900}
                align="center"
            >
                {props.title}
            </Title> : <div />}


            <Textarea
                autoFocus={true}
                mt="md"
                label="Your contribution"
                placeholder="What did you do for the DAO?"
                maxRows={10}
                minRows={5}
                autosize
                name="contributionText"
                variant="filled"
                {...form.getInputProps('contributionText')}
                required={true}
            />

            <TextInput
                label="Evidence Url 1"
                placeholder="https://..."
                mt="md"
                name="evidence1"
                variant="filled"
                {...form.getInputProps('evidence1')}
            />
            {form.values.evidence1 && <TextInput
                label="Evidence Url 2"
                placeholder="https://..."
                mt="md"
                name="evidence2"
                variant="filled"
                {...form.getInputProps('evidence2')}
            />
            }
            {form.values.evidence2 && <TextInput
                label="Evidence Url 3"
                placeholder="https://..."
                mt="md"
                name="evidence3"
                variant="filled"
                {...form.getInputProps('evidence3')}
            />
            }

            <MultiSelect
                mt="md"
                label="Your Roles"
                placeholder="Type your role"
                data={roles}
                searchable
                creatable
                dropdownPosition="top"
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                    setRoles([...roles, query]);
                    return query;
                }}
                {...form.getInputProps('roles')} />
            <Group position="center" mt="xl">
                <Button color="gray" radius="md" onClick={saveLocalStorage}>Save Draft</Button>
                <Button radius="md" onClick={_candidate} variant="gradient" gradient={{ from: 'blue', to: 'grape' }}>Submit to Blockchain</Button>
            </Group>
        </>}
    </>
}