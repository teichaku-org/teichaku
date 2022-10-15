import { css } from "@emotion/react"
import { Badge, useMantineTheme } from "@mantine/core"
// TODO: これって定義可能ではないので、文字列を受け取って一意の色を返す関数を定義する
const jobColors: Record<string, string> = {
    開発者: "blue",
    マーケター: "orange",
    デザイナー: "green",
    プロダクトマネージャー: "grape",
};

export const RoleBadge = ({ roles }: { roles: string[] }) => {
    const theme = useMantineTheme();
    return <> {roles.map((role, index) => (
        <Badge
            key={role}
            color={jobColors[role]}
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