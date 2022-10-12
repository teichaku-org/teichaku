import { css } from "@emotion/react";
import { Text, ThemeIcon } from "@mantine/core";
import { IconHistory } from "@tabler/icons";

export function HistoryTitle() {
  return (
    <>
      <Text
        component="span"
        align="center"
        //   color={theme.colorScheme === "dark" ? "white" : "black"}
        // color="white"
        variant="gradient"
        gradient={{ from: "blue", to: "grape", deg: 40 }}
        size="xl"
        weight={700}
        style={{
          fontFamily: "Greycliff CF, sans-serif",
          fontSize: "40px",
          paddingBottom: "10px",
        }}
      >
        Englister DAO History
      </Text>
    </>
  );
}
