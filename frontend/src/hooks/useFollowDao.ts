import { useEffect, useState } from "react";

export const useFollowDao = () => {
    const [followedDaoList, setFollowedDaoList] = useState<string[]>([]);

    useEffect(() => {
        const daoList = localStorage.getItem("followedDaoList");
        if (daoList) {
            setFollowedDaoList(JSON.parse(daoList));
        }
    }, []);

    const follow = (daoId: string) => {
        localStorage.setItem("followedDaoList", JSON.stringify([...followedDaoList, daoId]));
        setFollowedDaoList([...followedDaoList, daoId]);
    }

    const unfollow = (daoId: string) => {
        localStorage.setItem("followedDaoList", JSON.stringify(followedDaoList.filter((id) => id !== daoId)));
        setFollowedDaoList(followedDaoList.filter((id) => id !== daoId));
    }

    const isFollowed = (daoId: string) => {
        return followedDaoList.includes(daoId);
    }

    return {
        followedDaoList,
        follow,
        unfollow,
        isFollowed,
    }

}