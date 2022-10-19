import { Menu, Button, Text } from "@mantine/core";
import { IconArrowsSort, IconCircleCheck } from "@tabler/icons";
import { SortKeys } from "./HistoryList";

interface Props {
  sortKeys: SortKeys;
}

export function SortButton(props: Props) {
  const { sortKeys } = props;
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
        {Object.keys(sortKeys).map((key) => {
          return (
            <Menu.Item
              color="white"
              rightSection={<IconCircleCheck />}
              key={key}
              onClick={() => {}}
            >
              {key}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
