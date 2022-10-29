import { Links } from "@/constants/Links";
import { Button, Container, Group, Title } from "@mantine/core";
import Link from "next/link";

const NodataMessage = () => {
  const commonPath = Links.getCommonPath()
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
      <Link href={commonPath + "/poll"}>
        <Group position="center" my="xl">
          <Button
            radius="md"
            variant="gradient"
            gradient={{ from: "blue", to: "grape" }}
          >
            Start From Here
          </Button>
        </Group>
      </Link>
    </Container>
  );
};

export default NodataMessage;
