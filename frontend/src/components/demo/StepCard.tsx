import { Button, Container, Paper, Text } from "@mantine/core"

interface Props {
  title: string
  onClick: () => void
}

export const StepCard = (props: Props) => {
  return (
    <Paper p="lg" mx="lg" variant="outline">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ flexGrow: 2 }}>{props.title}</Text>
        <Button variant="light" color="blue" radius="md" onClick={props.onClick}>
          GO
        </Button>
      </div>
    </Paper>
  )
}
