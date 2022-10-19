import { useEffect, useState } from "react";
import { Drawer, ScrollArea, Text, useMantineTheme } from "@mantine/core";
import { keys } from "@mantine/utils";
import { css } from "@emotion/react";
import { HistoryCard } from "./HistoryCard";
import { SortButton } from "./SortButton";
import { FilterButton } from "./FilterButton";
import { SingleAssessment } from "../assessment/SingleAssessment";
import { DaoHistory } from "@/domains/DaoHistory";

type RowData = DaoHistory;
interface TableSortProps {
  data: RowData[];
}

function getIsDuplicate(arr1: string[], arr2: string[]) {
  return (
    [...arr1, ...arr2].filter(
      (item) => arr1.includes(item) && arr2.includes(item)
    ).length > 0
  );
}

function filterByRole(data: RowData[], filterRoles: string[]) {
  return data.filter((item) => {
    return getIsDuplicate(item.roles, filterRoles);
  });
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  if (sortBy === "timestamp") {
    return filterData(
      data.sort((x, y) => {
        const firstDate = new Date(x.timestamp);
        const SecondDate = new Date(y.timestamp);

        if (firstDate < SecondDate) return payload.reversed ? -1 : 1;
        if (firstDate > SecondDate) return payload.reversed ? 1 : -1;
        return 0;
      }),
      payload.search
    );
  }

  if (sortBy === "reward") {
    return filterData(
      [...data].sort((a, b) => {
        if (payload.reversed) {
          return String(b[sortBy]).localeCompare(String(a[sortBy]), undefined, {
            numeric: true,
          });
        }

        return String(a[sortBy]).localeCompare(String(b[sortBy]), undefined, {
          numeric: true,
        });
      }),
      payload.search
    );
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

export interface FilterRoles {
  [index: string]: boolean;
}

export function HistoryList({ data }: TableSortProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const theme = useMantineTheme();
  const [selectedContribution, setSelectedContribution] = useState<{
    pollId: number;
    contributor: string;
  }>();
  const opened = selectedContribution !== undefined;

  const [filterObjRoles, setFilterObjRoles] = useState<FilterRoles>({});

  const handleFilterRoles = (role: string) => {
    if (role === "全て") {
      const roles: FilterRoles = {};
      if (filterObjRoles["全て"]) {
        Object.keys(filterObjRoles).forEach((key) => {
          roles[key] = false;
        });
        setFilterObjRoles(roles);
        return;
      }
      Object.keys(filterObjRoles).forEach((key) => {
        roles[key] = true;
      });
      setFilterObjRoles(roles);
      return;
    }

    setFilterObjRoles({ ...filterObjRoles, [role]: !filterObjRoles[role] });
    return;
  };

  const onClickCard = (row: { pollId: number; contributor: string }) => {
    if (
      selectedContribution?.pollId === row.pollId &&
      selectedContribution?.contributor === row.contributor
    ) {
      setSelectedContribution(undefined);
      return;
    }
    setSelectedContribution({
      pollId: row.pollId,
      contributor: row.contributor,
    });
  };

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  useEffect(() => {
    //ロールを抽出
    const roles: FilterRoles = { 全て: true };
    data.forEach((dao) => {
      dao.roles.forEach((role) => {
        roles[role] = true;
      });
    });
    setFilterObjRoles(roles);
  }, []);

  //TODO フィルターした後にソートしないといけないので現在のソートキーを状態で持つ必要がありそう
  useEffect(() => {
    const filterRoles = Object.keys(filterObjRoles).filter(
      (key) => filterObjRoles[key]
    );
    setSortedData(
      sortData(filterByRole(data, filterRoles), {
        sortBy: "timestamp",
        reversed: false,
        search: "",
      })
    );
  }, [filterObjRoles]);

  const rows = sortedData.map((row, index) => (
    <div
      key={index}
      css={css`
        margin: 20px;
      `}
    >
      <HistoryCard
        key={index}
        contributionText={row.contributionText}
        reward={String(Math.round(row.reward))}
        roles={row.roles}
        timestamp={row.timestamp.toLocaleString()}
        onClick={() =>
          onClickCard({ pollId: row.pollId, contributor: row.contributor })
        }
      />
    </div>
  ));

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
      `}
    >
      <div
        css={
          opened
            ? css`
                width: calc(100% - 400px);
              `
            : css`
                width: 100%;
                max-width: 1000px;
                margin: auto;
              `
        }
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            margin-left: 20px;
            margin-right: 20px;
          `}
        >
          <Text
            size="xl"
            align="left"
            color={theme.colorScheme === "dark" ? "white" : "black"}
          >
            <span style={{ fontSize: "25px" }}>{rows.length}</span>件
          </Text>
          <div
            css={css`
              margin-left: auto;
              display: flex;
            `}
          >
            <SortButton />
            <FilterButton
              handleFilterRoles={handleFilterRoles}
              roles={filterObjRoles}
            />
          </div>
        </div>
        {rows.length > 0 ? (
          <div>{rows}</div>
        ) : (
          <tr>
            <td colSpan={Object.keys(data[0]).length}>
              <Text weight={500} align="center">
                Nothing found
              </Text>
            </td>
          </tr>
        )}
      </div>
      <Drawer
        opened={opened}
        onClose={() => setSelectedContribution(undefined)}
        position="right"
        size={400}
        lockScroll={false}
        withOverlay={false}
        closeOnClickOutside
      >
        {selectedContribution && (
          <ScrollArea style={{ height: "100%" }} p="lg">
            <SingleAssessment
              pollId={selectedContribution.pollId}
              contributor={selectedContribution.contributor}
            />
          </ScrollArea>
        )}
      </Drawer>
    </div>
  );
}
