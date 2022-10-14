import { Menu, Button, Text, Checkbox } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconFilter,
} from "@tabler/icons";

export function FilterButton() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          leftIcon={<IconFilter />}
          variant="subtle"
          color="gray"
          radius="lg"
        >
          ロールで絞り込み
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <Checkbox label="開発者" />
        </Menu.Item>
        <Menu.Item>
          <Checkbox label="デザイナー" />
        </Menu.Item>
        <Menu.Item>
          <Checkbox label="マーケター" />
        </Menu.Item>
        <Menu.Item>
          <Checkbox label="PdM" />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
