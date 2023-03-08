import { useEffect, useState } from "react"
import { Center, Drawer, ScrollArea, Text, Title, useInputProps, useMantineTheme } from "@mantine/core"
import { keys } from "@mantine/utils"
import { css } from "@emotion/react"
import { HistoryCard } from "./HistoryCard"
import { SortButton } from "./SortButton"
import { FilterButton } from "./FilterButton"
import { SingleAssessment } from "../assessment/SingleAssessment"
import { DaoHistory } from "@/domains/DaoHistory"
import { useLocale } from "@/i18n/useLocale"

interface Props {
  data: DaoHistory[]
  title?: string
  subTitle?: string
  isWeb3: boolean
}

function filterByRole(data: DaoHistory[], filterRoles: string[]) {
  if (filterRoles.includes("all")) return data
  return data.filter((item) => {
    return item.roles.some((role) => filterRoles.includes(role))
  })
}

function filterData(data: DaoHistory[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) => keys(data[0]).some((key) => String(item[key]).includes(query)))
}

function sortData(data: DaoHistory[], payload: { sortBy: keyof DaoHistory | null; reversed: boolean; search: string }) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  if (sortBy === "timestamp") {
    return filterData(
      data.sort((x, y) => {
        const firstDate = new Date(x.timestamp)
        const SecondDate = new Date(y.timestamp)

        if (firstDate < SecondDate) return payload.reversed ? -1 : 1
        if (firstDate > SecondDate) return payload.reversed ? 1 : -1
        return 0
      }),
      payload.search
    )
  }

  if (sortBy === "reward") {
    return filterData(
      [...data].sort((a, b) => {
        if (payload.reversed) {
          return String(b[sortBy]).localeCompare(String(a[sortBy]), undefined, {
            numeric: true,
          })
        }

        return String(a[sortBy]).localeCompare(String(b[sortBy]), undefined, {
          numeric: true,
        })
      }),
      payload.search
    )
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]))
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]))
    }),
    payload.search
  )
}

export interface FilterRoles {
  [index: string]: boolean
}

export interface SortKeys {
  [index: string]: boolean
}

export function HistoryList({ data, title, subTitle, isWeb3 }: Props) {
  const { t } = useLocale()
  const theme = useMantineTheme()
  const [selectedContribution, setSelectedContribution] = useState<{
    pollId: number
    contributor: string
  }>()
  const opened = selectedContribution !== undefined
  const [filterObjRoles, setFilterObjRoles] = useState<FilterRoles>({})

  //TODO: viewとkeyは分ける
  const [sortKeys, setSortKeys] = useState<SortKeys>({
    [t.History.SortKeys.Newest]: true,
    [t.History.SortKeys.Oldest]: false,
    [t.History.SortKeys.Largest]: false,
    [t.History.SortKeys.Smallest]: false,
  })

  const handleFilterRoles = (role: string) => {
    if (role === "all") {
      const roles: FilterRoles = {}
      if (filterObjRoles["all"]) {
        Object.keys(filterObjRoles).forEach((key) => {
          roles[key] = false
        })
        setFilterObjRoles(roles)
      } else {
        Object.keys(filterObjRoles).forEach((key) => {
          roles[key] = true
        })
        setFilterObjRoles(roles)
      }
      return
    } else {
      const roles = { ...filterObjRoles }
      roles[role] = !roles[role]
      if (!roles[role]) {
        roles["all"] = false
      }
      setFilterObjRoles(roles)
    }
    return
  }

  const onClickCard = (row: { pollId: number; contributor: string }) => {
    if (selectedContribution?.pollId === row.pollId && selectedContribution?.contributor === row.contributor) {
      setSelectedContribution(undefined)
      return
    }
    setSelectedContribution({
      pollId: row.pollId,
      contributor: row.contributor,
    })
  }

  const handleSortKeys = (selectedKey: string) => {
    const newSortKeys: FilterRoles = {}
    Object.keys(sortKeys).forEach((key) => {
      if (selectedKey === key) {
        newSortKeys[key] = true
        return
      }
      newSortKeys[key] = false
    })
    setSortKeys(newSortKeys)
    return
  }

  useEffect(() => {
    //ロールを抽出
    const roles: FilterRoles = { all: true }
    data.forEach((dao) => {
      dao.roles.forEach((role) => {
        roles[role] = true
      })
    })
    setFilterObjRoles(roles)
  }, [])

  const sortBy = (): keyof DaoHistory | null => {
    if (sortKeys[t.History.SortKeys.Newest] || sortKeys[t.History.SortKeys.Oldest]) {
      return "timestamp"
    }
    return "reward"
  }

  const reversed = (): boolean => {
    if (sortKeys[t.History.SortKeys.Newest] || sortKeys[t.History.SortKeys.Smallest]) {
      return false
    }
    return true
  }

  const filterRoles = Object.keys(filterObjRoles).filter((key) => filterObjRoles[key])
  const sortedData = sortData(filterByRole(data, filterRoles), {
    sortBy: sortBy(),
    reversed: reversed(),
    search: "",
  })

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
        contractAddress={row.rewardToken}
        roles={row.roles}
        timestamp={row.timestamp.toLocaleString()}
        onClick={() => onClickCard({ pollId: row.pollId, contributor: row.contributor })}
        contributor={row.contributor}
        isWeb3={isWeb3}
      />
    </div>
  ))

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
                width: calc(100% - 600px);
              `
            : css`
                width: 100%;
                max-width: 1000px;
                margin: auto;
              `
        }
      >
        <Center>
          <Title size="h1">{title}</Title>
        </Center>

        <Center mb="md">
          <Text color="lightGray">{subTitle}</Text>
        </Center>

        <div
          css={css`
            display: flex;
            justify-content: space-between;
            margin-left: 20px;
            margin-right: 20px;
          `}
        >
          <Text size="sm" align="left" color={theme.colorScheme === "dark" ? "white" : "black"}>
            <span style={{ fontSize: "25px", marginRight: 5 }}>{rows.length}</span>
            {t.History.HistoryList.Contributions}
          </Text>
          <div
            css={css`
              margin-left: auto;
              display: flex;
            `}
          >
            <SortButton sortKeys={sortKeys} handleSortKeys={handleSortKeys} />
            <FilterButton handleFilterRoles={handleFilterRoles} roles={filterObjRoles} />
          </div>
        </div>
        {rows.length > 0 ? (
          <div>{rows}</div>
        ) : (
          <Text weight={500} align="center">
            {t.History.HistoryList.NothingFound}
          </Text>
        )}
      </div>
      <Drawer
        opened={opened}
        onClose={() => setSelectedContribution(undefined)}
        position="right"
        size={600}
        lockScroll={false}
        withOverlay={false}
        closeOnClickOutside
      >
        {selectedContribution && (
          <ScrollArea style={{ height: "100%" }} p="lg">
            <SingleAssessment
              pollId={selectedContribution.pollId}
              contributor={selectedContribution.contributor}
              isWeb3={isWeb3}
            />
          </ScrollArea>
        )}
      </Drawer>
    </div>
  )
}
