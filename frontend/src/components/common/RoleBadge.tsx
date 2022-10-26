import { css } from "@emotion/react"
import { Badge, useMantineTheme } from "@mantine/core"

const jobColors = (role: string) => {
    const colorList = ["blue", "orange", "green", "grape", "red", "lime", "pink", "violet", "indigo", "cyan", "teal"];
    const hash = role.split("").reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
    return colorList[hash % colorList.length];
}

export const RoleBadge = ({ roles }: { roles: string[] }) => {
    const theme = useMantineTheme();
    return <> {roles.map((role, index) => (
        <Badge
            key={role}
            color={jobColors(role)}
            variant={theme.colorScheme === "dark" ? "light" : "outline"}
            size="lg"
            css={css`
              margin-right: 5px;
            `}
        >
            {role}
        </Badge>))}
    </>
}