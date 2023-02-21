import { Assessment } from "@/domains/Assessment"
import { DaoHistory } from "@/domains/DaoHistory"
import { DaoInfo } from "@/domains/DaoInfo"

export type useDaoHistoryInterface = (props: { daoId: string; projectId: string }) => {
  daoHistory: DaoHistory[]
  assessments: Assessment[]
  daoInfo: DaoInfo | undefined
  load: () => Promise<void>
}

export type useDaoHistoryInterfaceIsWeb3 = (
  props: {
    daoId: string
    projectId: string
  },
  isWeb3: boolean
) => {
  daoHistory: DaoHistory[]
  assessments: Assessment[]
  daoInfo: DaoInfo | undefined
  load: () => Promise<void>
}
