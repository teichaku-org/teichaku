import { AppInfo } from "@/constants/AppInfo"
import { useLocale } from "@/i18n/useLocale";
import { Group, Button, createStyles } from "@mantine/core"
import Link from "next/link";
import { useRouter } from "next/router";
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
    const { t } = useLocale()
    const router = useRouter()
    const onClickDemo = () => {
        const path = `${process.env.NEXT_PUBLIC_DEMO_PATH}/overview`
        router.push(path)
    }
    return <Group className={classes.controls}>
        <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'grape' }}
            component="a"
            onClick={onClickDemo}
        >
            {t.Button.Demo}
        </Button>

        <Link href="/create-dao">
            <Button
                size="xl"
                variant="default"
                className={classes.control}
            >
                {t.Button.CreateYourDAO}
            </Button>
        </Link>
    </Group>
}

