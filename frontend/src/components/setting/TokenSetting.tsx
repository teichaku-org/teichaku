import useDaoToken from "@/hooks/dao/useDaoToken"
import { Button, Text, Paper, TextInput, Card } from "@mantine/core"
import { useRouter } from "next/router"

export const TokenSetting = () => {
    const router = useRouter()
    const { daoId, projectId } = router.query
    const { tokenSymbol } = useDaoToken({ daoId: daoId as string, projectId: projectId as string });
    return <Paper p="lg" mb="lg">
        <Text size="md" weight={700} >
            Token for distribution
        </Text>
        <Card mb="md">
            Current Token Symbol: {" "}
            <Text size="lg" weight={500} mb="md" span>
                {tokenSymbol}
            </Text>
        </Card>
        <TextInput
            placeholder="0x..."
            label="ERC20 Token Address"
            mb="sm"
        />
        <Button>Update</Button>
    </Paper>
}