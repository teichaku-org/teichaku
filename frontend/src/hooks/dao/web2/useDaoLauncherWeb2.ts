import { useLocale } from "@/i18n/useLocale";
import { useRouter } from "next/router";
import { useDaoLauncherInterface } from "../interface/useDaoLauncherInterface";


const useDaoLauncherWeb2: useDaoLauncherInterface = () => {
    const router = useRouter()
    const { t } = useLocale()

    const createDao = async (daoId: string, projectId: string,
        daoName: string, daoDescription: string,
        website: string, logo: string,
        tokenAddress: string,
        contributorReward: number,
        reviewerReward: number,
        votingDurattion: number) => {

    }

    return {
        createDao
    };
};


export default useDaoLauncherWeb2