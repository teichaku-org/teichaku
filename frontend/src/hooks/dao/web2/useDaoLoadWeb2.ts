// doaId, projectIdから必要なコントラクトアドレス等を抽出する

import { NftContractAddress, PollContractAddress, TokenContractAddress } from "@/domains/atoms/DaoContractAddressAtom";
import { CommissionFeeAtom, ContributorRewardAtom, VoterRewardAtom } from "@/domains/atoms/PollDetailAtom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDaoLoadInterface } from "../interface/useDaoLoadInterface";


export const useDaoLoadWeb2: useDaoLoadInterface = () => {
    const router = useRouter()
    const { daoId: _daoId, projectId: _projectId } = router.query
    const daoId = _daoId as string
    const projectId = _projectId as string

    const contractAddress = process.env
        .NEXT_PUBLIC_DAOHISTORY_CONTRACT_ADDRESS as string;

    const [____, setPollContractAddress] = useAtom(PollContractAddress)
    const [__, setContributorReward] = useAtom(ContributorRewardAtom);
    const [_____, setCommissionFee] = useAtom(CommissionFeeAtom);
    const [___, setVoterReward] = useAtom(VoterRewardAtom);
    const [_, setTokenContractAddress] = useAtom(TokenContractAddress)
    const [______, setNftContractAddress] = useAtom(NftContractAddress)

    const load = async () => {

    }

    useEffect(() => {
        if (!(daoId && projectId)) return
        load()
    }, [daoId, projectId])
}