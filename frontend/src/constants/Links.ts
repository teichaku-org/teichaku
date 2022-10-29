import { useRouter } from "next/router";

export const Links = {
    getCommonPath: () => {
        const router = useRouter();
        const { daoId, projectId } = router.query;
        return `/${daoId}/${projectId}`;
    }
}