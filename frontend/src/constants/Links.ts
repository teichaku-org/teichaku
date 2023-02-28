import { NextRouter, Router, useRouter } from "next/router"

export const Links = {
  getCommonPath: (router: NextRouter) => {
    const { type, daoId, projectId } = router.query
    if (!type) {
      return `/check/${daoId}/${projectId}`
    }
    return `/${type}/${daoId}/${projectId}`
  },
}
