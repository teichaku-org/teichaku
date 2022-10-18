import { useEffect, useState } from "react";
import {
  Container,
  Divider,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import { css } from "@emotion/react";
import { HistoryCard } from "./HistoryCard";
import { SortButton } from "./SortButton";
import { FilterButton, roles } from "./FilterButton";
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

export type FilterChecks = {
  all: boolean;
  dev: boolean;
  designer: boolean;
  marketer: boolean;
  pdm: boolean;
};

export function HistoryList({ data }: TableSortProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const theme = useMantineTheme();
  const [selectedContribution, setSelectedContribution] = useState<{ pollId: number, contributor: string }>();
  const opened = selectedContribution !== undefined;
  const [filterRoles, setFilterRoles] = useState(Object.values(roles));

  const [filterChecks, setFilterChecks] = useState<FilterChecks>({
    all: true,
    dev: true,
    designer: true,
    marketer: true,
    pdm: true,
  });

  const handleFilterChecks = (role: string) => {
    switch (role) {
      case "開発者":
        setFilterChecks({ ...filterChecks, dev: !filterChecks.dev });
        return;
      case "デザイナー":
        setFilterChecks({ ...filterChecks, designer: !filterChecks.designer });
        return;
      case "マーケター":
        setFilterChecks({ ...filterChecks, marketer: !filterChecks.marketer });
        return;
      case "プロダクトマネージャー":
        setFilterChecks({ ...filterChecks, pdm: !filterChecks.pdm });
        return;
      default:
        console.error(`Sorry, we are out of ${role}.`);
    }
  };

  const handleFilterRoles = (role: string) => {
    if (role === "全て") {
      //全てのチェックが選択されている時は全て外す
      if (Object.values(roles).length === filterRoles.length) {
        setFilterRoles([]);
        setFilterChecks({
          all: false,
          dev: false,
          designer: false,
          marketer: false,
          pdm: false,
        });
        return;
      }
      //全てのチェックが外れている時は全てチェックをつける
      setFilterRoles(Object.values(roles));
      setFilterChecks({
        all: true,
        dev: true,
        designer: true,
        marketer: true,
        pdm: true,
      });
      return;
    }
    //フィルターにロールが含まれている時はそれを外す
    if (filterRoles.includes(role)) {
      const newFilterRoles = filterRoles.filter((item) => item !== role);
      setFilterRoles(newFilterRoles);
      handleFilterChecks(role);
      return;
    }
    //フィルターにロールが含まれていない時は加える
    setFilterRoles([...filterRoles, role]);
    handleFilterChecks(role);
  };

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  useEffect(() => {
    setSortedData(
      sortData(data, {
        sortBy: "reward",
        reversed: true,
        search: "",
      })
    );
  }, []);

  //TODO フィルターした後にソートしないといけないので現在のソートキーを状態で持つ必要がありそう
  useEffect(() => {
    setSortedData(
      sortData(filterByRole(data, filterRoles), {
        sortBy: "reward",
        reversed: true,
        search: "",
      })
    );
  }, [filterRoles]);

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
        onClick={() => setSelectedContribution({ pollId: row.pollId, contributor: row.contributor })}
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
                width: calc(100% - 300px);
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
              filterChecks={filterChecks}
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
      {opened && (
        <>
          <Divider orientation="vertical" />
          <Container>
            <SingleAssessment pollId={selectedContribution.pollId} contributor={selectedContribution.contributor} />
          </Container>
        </>
      )}
    </div>
  );
}
