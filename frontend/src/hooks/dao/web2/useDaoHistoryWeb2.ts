import { AssessmentListAtom } from "@/domains/atoms/AssessmentListAtom"
import { DaoHistoryListAtom } from "@/domains/atoms/DaoHistoryListAtom"
import { DaoInfoAtom } from "@/domains/atoms/DaoInfoAtom"
import { useAtom } from "jotai"
import { useDaoHistoryInterface } from "../interface/useDaoHistoryInterface"
<<<<<<< HEAD
import { APIClient } from "@/utils/APIClient"
import { DaoHistory } from "@/domains/DaoHistory"
=======
import { APIClient } from "@/types/APIClient"
import { DaoHistory, DaoHistoryWithNumber } from "@/domains/DaoHistory"
>>>>>>> 0cd66ae483c36ce5fff0f6aa42122019afd57beb
import { Assessment } from "@/domains/Assessment"
import { DaoInfo } from "@/domains/DaoInfo"
import useWeb3Auth from "@/hooks/web3/useWeb3Auth"

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
  const { getUserIdToken } = useWeb3Auth()

  const load = async () => {
    const idToken = await getUserIdToken()
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }
    const resDaoHistory = await apiClient.post("/getDaoHistory", { daoId: daoId, projectId: projectId }, headers)

    let _daoHistory: DaoHistory[] = []
    if (resDaoHistory) {
      _daoHistory = resDaoHistory.data.map((d: DaoHistoryWithNumber) => {
        return {
          ...d,
          timestamp: new Date(d.timestamp),
        }
      })
    }

    setDaoHistory(_daoHistory)

    const resDaoAssessments = await apiClient.post(
      "/getDaoAssessments",
      { daoId: daoId, projectId: projectId },
      headers
    )

    let _assessments: Assessment[] = []
    if (resDaoAssessments) {
      _assessments = resDaoAssessments.data
    }
    setAssessments(_assessments)

    const resDaoInfo = await apiClient.post("/getDaoInfo", { daoId: daoId }, headers)
    let _daoInfo: DaoInfo | undefined
    if (resDaoInfo) {
      _daoInfo = resDaoInfo.data
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
