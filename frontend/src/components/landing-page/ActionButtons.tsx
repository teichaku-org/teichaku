import { AppInfo } from "@/constants/AppInfo"
import { Group, Button, createStyles } from "@mantine/core"
const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
    controls: {
        marginTop: theme.spacing.xl * 2,

        [BREAKPOINT]: {
            marginTop: theme.spacing.xl,
        },
    },

    control: {
        height: 54,
        paddingLeft: 38,
        paddingRight: 38,

        [BREAKPOINT]: {
            height: 54,
            paddingLeft: 18,
            paddingRight: 18,
            flex: 1,
        },
    },
}));

export const ActionButtons = () => {
    const { classes } = useStyles();
    return <Group className={classes.controls}>
        <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'grape' }}
            component="a"
            href="/demo/season1/history"
        >
            Demo
        </Button>

        <Button
            component="a"
            size="xl"
            variant="default"
            className={classes.control}
            href={AppInfo.inqueryUrl}
        >
            Create Your DAO
        </Button>
    </Group>
}

