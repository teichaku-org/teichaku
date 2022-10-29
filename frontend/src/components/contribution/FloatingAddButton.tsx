import { Links } from "@/constants/Links"
import { ActionIcon } from "@mantine/core"
import { IconPlus } from "@tabler/icons"
import { useRouter } from "next/router"

export const FloatingAddButton = () => {
    const router = useRouter()
    const onClick = () => {
        const commonPath = Links.getCommonPath()
        router.push(commonPath + "/contribution")
    }
    return <div style={{ position: "fixed", right: 20, bottom: 20 }}>
        <ActionIcon onClick={onClick} color="blue" size={50} radius="xl" variant="filled">
            <IconPlus size={34} />
        </ActionIcon>
    </div>
}