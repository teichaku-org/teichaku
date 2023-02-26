// doaId, projectIdから必要なコントラクトアドレス等を抽出する

import { NftContractAddress, PollContractAddress, TokenContractAddress } from "@/domains/atoms/DaoContractAddressAtom"
import { CommissionFeeAtom, ContributorRewardAtom, VoterRewardAtom } from "@/domains/atoms/PollDetailAtom"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDaoLoadInterface } from "../interface/useDaoLoadInterface"
import { APIClient } from "@/types/APIClient"

export const useDaoLoadWeb2: useDaoLoadInterface = () => {
  const router = useRouter()
  const { daoId: _daoId, projectId: _projectId } = router.query
  const daoId = _daoId as string
  const projectId = _projectId as string
  const apiClient = new APIClient()

  const contractAddress = process.env.NEXT_PUBLIC_DAOHISTORY_CONTRACT_ADDRESS as string

  const [____, setPollContractAddress] = useAtom(PollContractAddress)
  const [__, setContributorReward] = useAtom(ContributorRewardAtom)
  const [_____, setCommissionFee] = useAtom(CommissionFeeAtom)
  const [___, setVoterReward] = useAtom(VoterRewardAtom)
  const [_, setTokenContractAddress] = useAtom(TokenContractAddress)
  const [______, setNftContractAddress] = useAtom(NftContractAddress)

  const load = async () => {
    const resContributorAssignmentToken = await apiClient.post("/contributorAssignmentToken", {
      daoId: daoId,
      projectId: projectId,
    })
    if (resContributorAssignmentToken) {
      setContributorReward(resContributorAssignmentToken.data.contributorAssignmentToken)
    }

    const resVoterAssignmentToken = await apiClient.post("/voterAssignmentToken", {
      daoId: daoId,
      projectId: projectId,
    })
    if (resVoterAssignmentToken) {
      setVoterReward(resVoterAssignmentToken.data.contributorAssignmentToken)
    }
  }

  useEffect(() => {
    if (!(daoId && projectId)) return
    load()
  }, [daoId, projectId])
}
