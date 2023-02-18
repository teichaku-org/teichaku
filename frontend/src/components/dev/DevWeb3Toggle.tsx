import { Web3FlagAtom } from '@/domains/atoms/Web3FlagAtom';
import { useMantineColorScheme, SegmentedControl, Group, Center, Box } from '@mantine/core';
import { IconSun, IconMoon, IconBarrierBlock, IconBarrierBlockOff } from '@tabler/icons';
import { useAtom } from 'jotai';

export function DevWeb3Toggle() {
    const [isWeb3, setIsWeb3] = useAtom(Web3FlagAtom)

    return (
        <Group position="center" my="xl">
            <SegmentedControl
                value={isWeb3 ? 'web3' : 'web2'}
                onChange={(value: 'web3' | 'web2') => setIsWeb3(value === 'web3')}
                data={[
                    {
                        value: 'web3',
                        label: (
                            <Center>
                                <IconBarrierBlock size={16} stroke={1.5} />
                                <Box ml={10}>Web3</Box>
                            </Center>
                        ),
                    },
                    {
                        value: 'web2',
                        label: (
                            <Center>
                                <IconBarrierBlockOff size={16} stroke={1.5} />
                                <Box ml={10}>Web2</Box>
                            </Center>
                        ),
                    },
                ]}
            />
        </Group>
    );
}