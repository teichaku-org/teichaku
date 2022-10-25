import { useClipboard } from "@mantine/hooks";
import { CopyButton, ActionIcon, Tooltip } from '@mantine/core';
import { IconCheck, IconCopy } from "@tabler/icons";


export const IconCopyButton = ({ text }: { text: string }) => {
    return (
        <CopyButton value={text} timeout={2000}>
            {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow >
                    <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    </ActionIcon>
                </Tooltip>
            )}
        </CopyButton>
    );
}