import { Menu, Button, Text } from "@mantine/core";
import { IconArrowsSort, IconCircleCheck } from "@tabler/icons";

export function SortButton() {
  return (
    <Menu shadow="md" width={200} withArrow>
      <Menu.Target>
        <Button
          leftIcon={<IconArrowsSort />}
          variant="subtle"
          color="gray"
          radius="lg"
        >
          並び替え
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item color="white" rightSection={<IconCircleCheck />}>
          新しい順
        </Menu.Item>
        <Menu.Item color="white" rightSection={<IconCircleCheck />}>
          古い順
        </Menu.Item>
        <Menu.Item color="white" rightSection={<IconCircleCheck />}>
          大きな貢献順
        </Menu.Item>
        <Menu.Item>小さな貢献順</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
