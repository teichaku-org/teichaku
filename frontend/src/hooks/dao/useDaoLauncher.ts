import { useLocale } from "@/i18n/useLocale";
import { DAOLauncher } from "@/types/DAOLauncher";
import { hideNotification, showNotification } from "@mantine/notifications";
import { Contract } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import artifact from "../../abi/DAOLauncher.sol/DAOLauncher.json";
import {
    getContract, getContractWithSigner
} from "../web3/useMetaMask";


export default () => {
    const router = useRouter()
    const { t } = useLocale()
    const contractAddress = process.env
        .NEXT_PUBLIC_DAOLAUNCHER_CONTRACT_ADDRESS as string;
    const contract = getContract(contractAddress, artifact.abi) as DAOLauncher;
    const contractWithSigner = getContractWithSigner(contractAddress, artifact.abi)

    const createDao = async (daoId: string, projectId: string,
        daoName: string, daoDescription: string,
        website: string, logo: string,
        tokenAddress: string,
        contributorReward: number,
        reviewerReward: number,
        votingDurattion: number) => {

        const tx = await contractWithSigner.functions.createDao(
            daoId, projectId,
            daoName, daoDescription,
            website, logo,
            tokenAddress,
            contributorReward,
            reviewerReward,
            votingDurattion
        )
        showNotification({
            id: "createDao",
            title: t.CreateDao.Complete.Notification.Title,
            message: t.CreateDao.Complete.Notification.Message,
        })
        await tx.wait()
        router.push(`/${daoId}/${projectId}/overview`)
        hideNotification("createDao")
    }

    return {
        createDao
    };
};
