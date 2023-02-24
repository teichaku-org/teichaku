import { AssessmentListAtom } from "@/domains/atoms/AssessmentListAtom"
import { DaoHistoryListAtom } from "@/domains/atoms/DaoHistoryListAtom"
import { DaoInfoAtom } from "@/domains/atoms/DaoInfoAtom"
import { useAtom } from "jotai"
import { useDaoHistoryInterface } from "../interface/useDaoHistoryInterface"
import { APIClient } from "@/types/APIClient"
import { DaoHistory } from "@/domains/DaoHistory"
import { Assessment } from "@/domains/Assessment"
import { DaoInfo } from "@/domains/DaoInfo"

interface Props {
  daoId: string
  projectId: string
}

const useDaoHistoryWeb2: useDaoHistoryInterface = (props: Props) => {
  const daoId = props.daoId
  const projectId = props.projectId
  const [daoHistory, setDaoHistory] = useAtom(DaoHistoryListAtom)
  const [assessments, setAssessments] = useAtom(AssessmentListAtom)
  const [daoInfo, setDaoInfo] = useAtom(DaoInfoAtom)
  const apiClient = new APIClient()

  const load = async () => {
    const resDaoHistory = await apiClient.post("/getDaoHistory", { daoId: daoId })

    let _daoHistory: DaoHistory[] = []

    if (resDaoHistory) {
      _daoHistory = resDaoHistory.data
    }
    setDaoHistory(_daoHistory)

    const resDaoAssessments = await apiClient.post("/getDaoAssessments", { daoId: daoId, projectId: projectId })

    let _assessments: Assessment[] = []
    if (resDaoAssessments) {
      _assessments = resDaoAssessments.data
    }
    setAssessments(_assessments)

    const resDaoInfo = await apiClient.post("/getDaoInfo", { daoId: daoId })
    let _daoInfo: DaoInfo | undefined
    if (resDaoInfo) {
      _daoInfo = {
        name: resDaoInfo.data?.name,
        description: resDaoInfo.data?.description,
        website: resDaoInfo.data?.website,
        logo: resDaoInfo.data?.logo,
        projects: resDaoInfo.data?.projects,
      }
    }
    setDaoInfo(_daoInfo)
  }

  return {
    daoHistory,
    assessments,
    daoInfo,
    load,
  }
}

export default useDaoHistoryWeb2
