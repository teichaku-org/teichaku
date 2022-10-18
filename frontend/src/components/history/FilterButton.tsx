import { Menu, Button, Checkbox } from "@mantine/core";
import { IconFilter } from "@tabler/icons";
import { useState } from "react";
import { FilterChecks } from "./HistoryList";

interface Props {
  handleFilterRoles: (role: string) => void;
  filterChecks: FilterChecks;
}

export const roles = {
  dev: "開発者",
  designer: "デザイナー",
  marketer: "マーケター",
  pdm: "プロダクトマネージャー",
};

export function FilterButton(prop: Props) {
  const { handleFilterRoles, filterChecks } = prop;
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
        <Menu.Item onClick={() => handleFilterRoles("全て")}>
          <Checkbox label="全て" checked={filterChecks.all} />
        </Menu.Item>
        <Menu.Item onClick={() => handleFilterRoles(roles.dev)}>
          <Checkbox label={roles.dev} checked={filterChecks.dev} />
        </Menu.Item>
        <Menu.Item onClick={() => handleFilterRoles(roles.designer)}>
          <Checkbox label={roles.designer} checked={filterChecks.designer} />
        </Menu.Item>
        <Menu.Item onClick={() => handleFilterRoles(roles.marketer)}>
          <Checkbox label={roles.marketer} checked={filterChecks.marketer} />
        </Menu.Item>
        <Menu.Item onClick={() => handleFilterRoles(roles.pdm)}>
          <Checkbox label={roles.pdm} checked={filterChecks.pdm} />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
