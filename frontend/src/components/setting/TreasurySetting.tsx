import useDaoToken from '@/hooks/dao/useDaoToken';
import usePoll from '@/hooks/dao/usePoll';
import { Text, Progress, Card, Button, Input, TextInput, Paper } from '@mantine/core';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useState } from 'react';
export const TreasurySetting = () => {
    const router = useRouter()
    const { daoId, projectId } = router.query
    const { contractAddress } = usePoll({ daoId: daoId as string, projectId: projectId as string });
    const { treasuryBalance, tokenSymbol, sendToken } = useDaoToken({ daoId: daoId as string, projectId: projectId as string });
    const [value, setValue] = useState('');
    const _sendToken = () => {
        sendToken(contractAddress, Number(value))
    }

    return <Paper p="lg" mb="lg">
        <Text size="md" weight={700} >
            Treasury Balance
        </Text>
        <Text size="lg" weight={500} mb="md">
            {treasuryBalance} {tokenSymbol}
        </Text>
        <TextInput
            label='Send Tokens to Treasury'
            placeholder="Specify the amount of tokens you want to transfer"
            mb="sm"
            onChange={e => setValue(e.currentTarget.value)}
            value={value}
        />
        <Button onClick={_sendToken}>Add</Button>
    </Paper>
}