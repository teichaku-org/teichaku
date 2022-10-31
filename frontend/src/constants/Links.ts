import { NextRouter, Router, useRouter } from "next/router";

export const Links = {
    getCommonPath: (router: NextRouter) => {
        const { daoId, projectId } = router.query;
        return `/${daoId}/${projectId}`;
    }
}