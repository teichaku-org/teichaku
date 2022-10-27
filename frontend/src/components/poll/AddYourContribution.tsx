import { Button, Group, Modal, MultiSelect, SimpleGrid, Textarea, TextInput, Title, useInputProps } from "@mantine/core"
import { IconPlus } from "@tabler/icons"
import { useEffect, useState } from "react"
import { useForm } from '@mantine/form';

interface Props {
    voted: boolean
    candidateToPoll: (contributionText: string, evidences: string[], roles: string[]) => void
}

export const AddYourContribution = (props: Props) => {
    const [roles, setRoles] = useState([
        "Engineer",
        "Designer",
        "Product Manager",
        "Marketing",
        "Sales",
        "Customer Support"
    ])
    const [opened, setOpened] = useState(false)
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

    const saveLocalStorage = () => {
        localStorage.setItem("candidate", JSON.stringify(form.values))
        window.location.reload()
    }

    const loadLocalStorage = () => {
        const candidate = localStorage.getItem("candidate")
        if (candidate) {
            form.setValues(JSON.parse(candidate))
        }
    }

    const clearLocalStorage = () => {
        localStorage.removeItem("candidate")
    }

    const _candidate = async () => {
        await props.candidateToPoll(form.values.contributionText, [form.values.evidence1, form.values.evidence2, form.values.evidence3], form.values.roles)
        clearLocalStorage()
        setOpened(false)
    }
    return <>
        <Modal
            opened={opened}
            size="xl"
            onClose={() => setOpened(false)}
        >
            <Title
                order={2}
                size="h1"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
                weight={900}
                align="center"
            >
                Explain Your Contributions!
            </Title>

            <Textarea
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
        </Modal>


        <Group position="center">
            <Button
                onClick={() => setOpened(true)}
                size="lg"
                variant="gradient"
                gradient={{ from: 'blue', to: 'grape' }}
                mb="md" fullWidth leftIcon={<IconPlus />}>
                {props.voted ? "Update Your Contribution" : "Add Your Contribution"}
            </Button>
        </Group>
    </>
}

