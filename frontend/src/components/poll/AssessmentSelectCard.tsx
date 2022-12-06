import { Card, Rating, useMantineTheme, Text, Center } from '@mantine/core';
import {
    IconMoodEmpty,
    IconMoodSmile,
    IconMoodHappy,
    IconMoodCrazyHappy,
    IconMoodConfuzed,
} from '@tabler/icons';

interface Props {
    label: string;
    value: number | undefined;
    onChange: (value: string) => void;
}

export function AssessmentSelectCard(props: Props) {
    const SIZE = 30
    const PointMap = (value: number) => {
        switch (value) {
            case 1:
                return 0
            case 2:
                return 1
            case 3:
                return 3
            case 4:
                return 6
            case 5:
                return 10
            default:
                return 0
        }
    }
    const convertValue = (value: number | undefined) => {
        switch (value) {
            case 0:
                return 1
            case 1:
                return 2
            case 3:
                return 3
            case 6:
                return 4
            case 10:
                return 5
            default:
                return undefined
        }
    }
    const getEmptyIcon = (value: number) => {
        const defaultProps = {
            size: SIZE,
            color: 'gray',
        };
        switch (value) {
            case 1:
                return <IconMoodConfuzed {...defaultProps} />;
            case 2:
                return <IconMoodEmpty {...defaultProps} />;
            case 3:
                return <IconMoodSmile {...defaultProps} />;
            case 4:
                return <IconMoodHappy {...defaultProps} />;
            case 5:
                return <IconMoodCrazyHappy {...defaultProps} />;
            default:
                return <IconMoodEmpty {...defaultProps} />;
        }
    };

    const getFullIcon = (value: number) => {
        const defaultProps = {
            size: SIZE,
        };
        const theme = useMantineTheme();

        switch (value) {
            case 1:
                return <IconMoodConfuzed {...defaultProps} color={theme.colors.red[7]} />;
            case 2:
                return <IconMoodEmpty {...defaultProps} color={theme.colors.orange[7]} />;
            case 3:
                return <IconMoodSmile {...defaultProps} color={theme.colors.yellow[7]} />;
            case 4:
                return <IconMoodHappy {...defaultProps} color={theme.colors.lime[7]} />;
            case 5:
                return <IconMoodCrazyHappy {...defaultProps} color={theme.colors.green[7]} />;
            default:
                return <IconMoodEmpty {...defaultProps} />;
        }
    };

    const onChange = (value: number) => {
        props.onChange(String(PointMap(value)));
    };

    return (
        <div>
            <Center mb="xs"><Text weight="bold">{props.label}</Text></Center>
            <Card shadow="xs" p="xs">
                <Center mb="xs">
                    <Text size={30}>{props.value || 0} pt</Text>
                </Center>
                <Center>
                    <Rating
                        onChange={onChange}
                        value={convertValue(props.value)}
                        emptySymbol={getEmptyIcon}
                        fullSymbol={getFullIcon}
                        highlightSelectedOnly />
                </Center>
            </Card>
        </div>
    );
}