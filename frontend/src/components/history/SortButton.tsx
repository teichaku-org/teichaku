import { Menu, Button, Text } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconSortAscending,
  IconFilter,
  IconSortAscending2,
  IconArrowsSort,
} from "@tabler/icons";

export function SortButton() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          leftIcon={<IconArrowsSort />}
          variant="subtle"
          color="gray"
          radius="lg"
        >
          貢献度が高い
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>貢献度が高い</Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>簡単な貢献</Menu.Item>
        <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
        <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
