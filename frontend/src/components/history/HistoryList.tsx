import { useEffect, useState } from "react";
import {
  Container,
  createStyles,
  Divider,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import { css } from "@emotion/react";
import { HistoryCard } from "./HistoryCard";
import { SortButton } from "./SortButton";
import { FilterButton } from "./FilterButton";
import { SingleAssessment } from "../assessment/SingleAssessment";
import { DaoHistory } from "@/domains/DaoHistory";

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

type RowData = DaoHistory
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
  const [opened, setOpened] = useState(false);

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
        timestamp={row.timestamp.toString()}
        onClick={() => setOpened(!opened)}
      />
    </div>
  ));

  return (
    // <Container>
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
                width: 60%;
              `
            : css`
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
            <FilterButton />
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
            <SingleAssessment />
          </Container>
        </>
      )}
    </div>
    // </Container>
  );
}
