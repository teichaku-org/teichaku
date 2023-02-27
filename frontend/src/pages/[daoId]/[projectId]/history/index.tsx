import type { NextPage } from "next"

import { HistoryList } from "@/components/history/HistoryList"
import useDaoHistory from "@/hooks/dao/useDaoHistory"
import { useEffect, useLayoutEffect } from "react"
import { Center, Loader } from "@mantine/core"
import { useRouter } from "next/router"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import { useDaoLoad } from "@/hooks/dao/useDaoLoad"
import { FloatingAddButton } from "@/components/contribution/FloatingAddButton"
import { useLocale } from "@/i18n/useLocale"
import { APIClient } from "@/utils/APIClient"
import CopyInviteUrl from "@/components/common/CopyInviteUrl"

type props = {
  isWeb3: boolean
}

const History = ({ isWeb3 }: props) => {
  const { t } = useLocale()
  useDaoExistCheck(isWeb3)
  useDaoLoad(isWeb3)
  const router = useRouter()
  const { daoId, projectId } = router.query
  const { daoHistory, daoInfo, load } = useDaoHistory(
    { daoId: daoId as string, projectId: projectId as string },
    isWeb3
  )
  const title = t.History.Title(daoInfo?.name || "DAO")
  const subTitle = t.History.SubTitle(daoInfo?.name || "DAO")
  useEffect(() => {
    if (daoId && projectId) {
      load()
    }
  }, [daoId, projectId])

  // Loading
  if (!daoHistory)
    return (
      <Center>
        <Loader size="lg" variant="dots" />
      </Center>
    )

  // No data
  if (daoHistory.length === 0) return <CopyInviteUrl />

  return (
    <div>
      <HistoryList data={daoHistory} title={title} subTitle={subTitle} isWeb3={isWeb3} />
      <FloatingAddButton />
    </div>
  )
}

export async function getServerSideProps(context: { query: { daoId: string } }) {
  // Fetch data from external API
  const apiClient = new APIClient()
  const res = await apiClient.post("/getIsWeb3", { daoId: context.query.daoId })
  return { props: { isWeb3: res ? res.data.isWeb3 : true } }
}

export default History
