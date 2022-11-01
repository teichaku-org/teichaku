import { useLocale } from "@/i18n/useLocale";
import { Menu, Button, Checkbox } from "@mantine/core";
import { IconFilter } from "@tabler/icons";

import { FilterRoles } from "./HistoryList";

interface Props {
  handleFilterRoles: (role: string) => void;
  roles: FilterRoles;
}

export function FilterButton(props: Props) {
  const { handleFilterRoles, roles } = props;
  const { t } = useLocale();
  return (
    <Menu closeOnItemClick={false} shadow="md" width={200} withArrow>
      <Menu.Target>
        <Button leftIcon={<IconFilter />} variant="subtle" color="gray" radius="lg">
          {t.Button.FilterByRole}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {Object.keys(roles).map((key) => {
          return (
            <Menu.Item key={key} onClick={() => handleFilterRoles(key)}>
              <Checkbox label={key} checked={roles[key]} />
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
