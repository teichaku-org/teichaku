import { Button, Container, Group, Title } from "@mantine/core";
import Link from "next/link";

const NodataMessage = () => {
  return (
    <Container>
      <Title
        order={1}
        size="h1"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
        weight={900}
        align="center"
      >
        Let's Start Contributing!
      </Title>
      <Link href={"/poll"}>
        <Group position="center" my="xl">
          <Button
            radius="md"
            variant="gradient"
            gradient={{ from: "blue", to: "grape" }}
          >
            Sart From Here
          </Button>
        </Group>
      </Link>
    </Container>
  );
};

export default NodataMessage;
