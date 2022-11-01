import { useLocale } from "@/i18n/useLocale";
import { Menu, Button, Text } from "@mantine/core";
import { IconArrowsSort, IconCircleCheck } from "@tabler/icons";
import { SortKeys } from "./HistoryList";

interface Props {
  sortKeys: SortKeys;
  handleSortKeys: (field: string) => void;
}

export function SortButton(props: Props) {
  const { t } = useLocale();
  const { sortKeys, handleSortKeys } = props;
  return (
    <Menu shadow="md" width={200} withArrow>
      <Menu.Target>
        <Button leftIcon={<IconArrowsSort />} variant="subtle" color="gray" radius="lg">
          {t.Button.SortBy}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {Object.keys(sortKeys).map((key) => {
          return (
            <Menu.Item
              color={sortKeys[key] ? "white" : ""}
              rightSection={sortKeys[key] && <IconCircleCheck />}
              key={key}
              onClick={() => handleSortKeys(key)}
            >
              {key}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
