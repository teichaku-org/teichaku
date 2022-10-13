import { createStyles, Text, SimpleGrid, Container } from '@mantine/core';
import { IconTruck, IconCertificate, IconCoin, TablerIcon } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    feature: {
        position: 'relative',
        paddingTop: theme.spacing.xl,
        paddingLeft: theme.spacing.xl,
    },

    overlay: {
        position: 'absolute',
        height: 100,
        width: 160,
        top: 0,
        left: 0,
        backgroundColor: theme.fn.variant({ variant: 'gradient', gradient: { from: "blue", to: "grape" } }).background,
        zIndex: 1,
    },

    content: {
        position: 'relative',
        zIndex: 2,
    },

    icon: {
        color: theme.fn.variant({ variant: 'gradient', gradient: { from: "blue", to: "grape" } }).color,
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
}));

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
    icon: TablerIcon;
    title: string;
    description: string;
}

function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
    const { classes, cx } = useStyles();

    return (
        <div className={cx(classes.feature, className)} {...others}>
            <div className={classes.overlay} />

            <div className={classes.content}>
                <Icon size={38} className={classes.icon} stroke={1.5} />
                <Text weight={700} size="lg" mb="xs" mt={5} className={classes.title} variant="gradient" gradient={{ deg: 0, from: "blue", to: "grape" }}>
                    {title}
                </Text>
                <Text color="dimmed" size="sm">
                    {description}
                </Text>
            </div>
        </div>
    );
}

const mockdata = [
    {
        icon: IconTruck,
        title: 'History',
        description:
            'It records the contributions that DAO members have made so far and helps newcomers to understand DAO.',
    },
    {
        icon: IconCertificate,
        title: 'Poll',
        description:
            'Contributor rewards are determined by a 360-degree evaluation by DAO members.',
    },
    {
        icon: IconCoin,
        title: 'Assessment',
        description:
            'Evaluations and comments on your achievements are recorded and can be taken out as NFT.',
    },
];

export function Features() {
    const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

    return (
        <Container mt={30} mb={30} size="lg">
            <h2>

                <Text variant='gradient' gradient={{ from: "blue", to: "grape" }} >DAO History System in a nutshell</Text>
            </h2>
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={50}>
                {items}
            </SimpleGrid>
        </Container>
    );
}