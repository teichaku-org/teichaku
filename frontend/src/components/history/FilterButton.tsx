import { Menu, Button, Checkbox } from "@mantine/core";
import { IconFilter } from "@tabler/icons";
import { useState } from "react";
import { DirectionArray, FilterChecks } from "./HistoryList";

interface Props {
  handleFilterRoles: (role: string) => void;
  roles: DirectionArray;
}

export const roles = {
  dev: "開発者",
  designer: "デザイナー",
  marketer: "マーケター",
  pdm: "プロダクトマネージャー",
};

export function FilterButton(props: Props) {
  const { handleFilterRoles, roles } = props;
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <Menu opened={isOpenMenu} shadow="md" width={200} withArrow>
      <Menu.Target>
        <Button
          leftIcon={<IconFilter />}
          variant="subtle"
          color="gray"
          radius="lg"
          onClick={() => {
            setIsOpenMenu(!isOpenMenu);
          }}
        >
          ロールで絞り込み
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
