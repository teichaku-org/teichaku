import { Button, Paper, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form";

export const PollPerspectiveSetting = () => {
    const form = useForm({
        initialValues: {
            evidence1: 'quality',
            evidence2: 'quantity',
            evidence3: 'effectiveness',
            evidence4: '',
            evidence5: '',
        },
    });
    return <Paper p="lg" mb="lg">
        <TextInput
            label="Perspective 1"
            placeholder="https://..."
            mt="md"
            name="perspective1"
            variant="filled"
            {...form.getInputProps('perspective1')}
        />
        {form.values.evidence1 && <TextInput
            label="Perspective 2"
            placeholder="https://..."
            mt="md"
            name="perspective2"
            variant="filled"
            {...form.getInputProps('perspective2')}
        />
        }
        {form.values.evidence2 && <TextInput
            label="Perspective 3"
            placeholder="https://..."
            mt="md"
            name="perspective3"
            variant="filled"
            {...form.getInputProps('perspective3')}
        />
        }
        {form.values.evidence3 && <TextInput
            label="Perspective 4"
            placeholder="https://..."
            mt="md"
            name="perspective4"
            variant="filled"
            {...form.getInputProps('perspective4')}
        />
        }
        {form.values.evidence4 && <TextInput
            label="Perspective 5"
            placeholder="https://..."
            mt="md"
            name="perspective5"
            variant="filled"
            {...form.getInputProps('perspective5')}
        />
        }
        <Button>Update</Button>
    </Paper>
}