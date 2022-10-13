import { useEffect, useState } from "react";
import {
  Button,
  createStyles,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import { css } from "@emotion/react";
import { HistoryCard } from "./HistoryCard";
import { HistoryTitle } from "./HistoryTitle";
import { IconMessageCircle, IconSettings } from "@tabler/icons";
import { SortButton } from "./SortButton";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface RowData {
  contributionText: string;
  reward: number;
  roles: string[];
  timestamp: string;
  contributor: string;
}

interface TableSortProps {
  data: RowData[];
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

export function HistoryList({ data }: TableSortProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const theme = useMantineTheme();

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
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

  const rows = sortedData.map((row, index) => (
    <div
      css={css`
        margin: 20px;
      `}
    >
      <HistoryCard
        key={index}
        contributionText={row.contributionText}
        reward={String(Math.round(row.reward))}
        roles={row.roles}
        timestamp={row.timestamp}
      />
    </div>
  ));

  return (
    <div
      css={css`
        width: 90%;
        margin: auto;
      `}
    >
      <div
        css={css`
          text-align: center;
        `}
      >
        <HistoryTitle />
      </div>
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
          <span style={{ fontSize: "30px" }}>{rows.length}</span>件
        </Text>
        <SortButton />
      </div>
      {rows.length > 0 ? (
        rows
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
  );
}
